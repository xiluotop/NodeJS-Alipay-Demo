/*
Navicat MySQL Data Transfer

Source Server         : mycon
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : alipay

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2019-10-30 21:20:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for order_list
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list` (
  `out_trade_no` varchar(255) COLLATE utf8_bin NOT NULL,
  `trade_no` varchar(255) COLLATE utf8_bin NOT NULL,
  `goods_name` varchar(255) COLLATE utf8_bin NOT NULL,
  `price` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `trade_status` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `payName` varchar(255) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of order_list
-- ----------------------------
INSERT INTO `order_list` VALUES ('1', '1', '1', '1', '1', '1', '1', '');
