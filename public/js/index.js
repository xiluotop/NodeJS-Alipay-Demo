jQuery || require('jquery')

$(function () {
    // 数组索引充当商品 id 号，有效值从 1 开始
    var goods = [{},
        {
            name: '大卫龙',
            price: 2,
        },
        {
            name: '冰阔咯',
            price: 6,
        },
        {
            name: '雪碧',
            price: 3,
        },
        {
            name: 'QQB',
            price: 1,
        },
    ]

    function refreshForm() {
        // 获取当前商品 id
        var goodsId = $('#goods').val();
        // 获取单价
        var price = goods[goodsId].price;
        // 获取当前购买总数
        var count = $('.count').val();
        // 设置单价显示
        $('#price').html(price);
        // 设置总价显示
        $('#total').html((price * count).toFixed(2));
    }

    refreshForm();

    // 当改变商品选项时
    $('#goods').change(function () {
        refreshForm();
    })

    // 当输入数量时
    $('.count').on('input', function () {
        // 获取当前值
        var count = $(this).val();
        if (isNaN(Number(count)) || Number(count) <= 0) {
            $(this).val(1);
        }
        refreshForm();
    })


    $('#buy').click(function () {
        if (!$('#username').val().trim()) {
            alert('请输入用户名！');
            return;
        }

        var goodsName = goods[$('#goods').val()].name;
        var count = $('.count').val();
        var price = goods[$('#goods').val()].price;
        var cost = $('#total').html();

        // 像服务器发送付款请求确认
        $.ajax({
            url: './payinfo',
            data: {
                payName: $('#username').val().trim(),
                goodsName: goodsName,
                count: count,
                price: price,
                cost: cost,
            },
            success: (res) => {
                // 请求正确时接收服务器的响应，再次确认是否需要生成订单
                if (res.code === 200) {
                    let info = `
                    购买人：${res.payName}\n
                    购买商品：${res.goodsName}\n
                    商品单价：${res.price}￥\n
                    购买个数：${res.count}\n
                    总共价钱：${res.cost}￥\n
                    确认创建订单进行购买吗？
                    `;
                    if (confirm(info)) {
                        // 利用 ajax 发送订单生成订单请求
                        $.ajax({
                            type: 'post',
                            url: './createOrder',
                            data: {
                                payName: $('#username').val().trim(),
                                goodsName: goodsName,
                                price: price,
                                count: count,
                                cost: cost,
                            },
                            // 服务器向支付宝请求订单后，返回的是一个form表单，需要插入到浏览器中进行自动跳转
                            success: function (res) {
                                $('body').append($(res));
                            }
                        })
                    }
                }
            }
        })
    })

    // 点击查询订单
    $('#searchOrder').click(function () {
        // 发送请求
        $.ajax({
            url: './getorder',
            success: function (res) {
                if (res.code === 200) {
                    var list = JSON.parse(res.list);
                    var htmlStr = '';
                    list.forEach(function (ele) {
                        htmlStr += '<tr>';
                        for (var key in ele) {
                            var info = ele[key];
                            if (key === 'price' || key === 'total_amount') {
                                info = info.toFixed(2) + '￥';
                            }

                            htmlStr += '<td>' + info + '</td>';
                        }
                        htmlStr += '</tr>';
                    });
                    $('#order_list').html(htmlStr);
                }
            }
        })
    })
})