"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = void 0;

var _reactNative = require("react-native");

var _stylesheet = require("../../stylesheet");

var styles = _reactNative.StyleSheet.create({
  container: {},
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  selectBtn: {
    width: (0, _stylesheet.widthToDp)('5'),
    height: (0, _stylesheet.widthToDp)('5'),
    marginLeft: (0, _stylesheet.widthToDp)('10'),
    marginRight: (0, _stylesheet.widthToDp)('3'),
    borderRadius: (0, _stylesheet.widthToDp)('1'),
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: (0, _stylesheet.widthToDp)('1')
  },
  unselect: {
    // backgroundColor: color.GREEN_4,
    // color: color.GREEN_0,
    // fontWeight: 'bold'
    backgroundColor: '#ddd',
    color: _stylesheet.color.BLUE_4
  },
  selected: {
    backgroundColor: _stylesheet.color.GREEN_4,
    color: _stylesheet.color.GREEN_0,
    fontWeight: 'bold'
  },
  selectedText: {
    fontSize: (0, _stylesheet.widthToDp)('4'),
    color: _stylesheet.color.BLUE_1
  },
  checkIcon: {
    fontSize: (0, _stylesheet.widthToDp)('4'),
    color: _stylesheet.color.WHITE
  },
  topicText: {
    fontSize: (0, _stylesheet.widthToDp)('4.5'),
    color: _stylesheet.color.BLUE_0
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: (0, _stylesheet.widthToDp)('2'),
    marginBottom: 15
  },
  cardHeader: {
    borderBottomColor: _stylesheet.color.WHITE,
    paddingHorizontal: (0, _stylesheet.widthToDp)('4'),
    paddingVertical: (0, _stylesheet.widthToDp)('2'),
    borderBottomWidth: 1
  },
  cardContainer: {
    padding: (0, _stylesheet.widthToDp)('2')
  }
});

exports.styles = styles;