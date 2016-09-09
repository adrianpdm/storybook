'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WrapStory = function (_React$Component) {
  (0, _inherits3.default)(WrapStory, _React$Component);

  function WrapStory(props) {
    (0, _classCallCheck3.default)(this, WrapStory);

    var _this = (0, _possibleConstructorReturn3.default)(this, (WrapStory.__proto__ || (0, _getPrototypeOf2.default)(WrapStory)).call(this, props));

    _this.knobChanged = _this.knobChanged.bind(_this);
    _this.resetKnobs = _this.resetKnobs.bind(_this);
    _this.setPaneKnobs = _this.setPaneKnobs.bind(_this);
    _this._knobsAreReset = false;
    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(WrapStory, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // Watch for changes in knob editor.
      this.props.channel.on('addon:knobs:knobChange', this.knobChanged);
      // Watch for the reset event and reset knobs.
      this.props.channel.on('addon:knobs:reset', this.resetKnobs);
      // Watch for any change in the knobStore and set the panel again for those
      // changes.
      this.props.knobStore.subscribe(this.setPaneKnobs);
      // Set knobs in the panel for the first time.
      this.setPaneKnobs();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.props.channel.removeListener('addon:knobs:knobChange', this.knobChanged);
      this.props.channel.removeListener('addon:knobs:reset', this.resetKnobs);
      this.props.knobStore.unsubscribe(this.setPaneKnobs);
    }
  }, {
    key: 'setPaneKnobs',
    value: function setPaneKnobs() {
      var _props = this.props;
      var channel = _props.channel;
      var knobStore = _props.knobStore;

      channel.emit('addon:knobs:setKnobs', knobStore.getAll());
    }
  }, {
    key: 'knobChanged',
    value: function knobChanged(change) {
      var name = change.name;
      var value = change.value;
      var knobStore = this.props.knobStore;
      // Update the related knob and it's value.

      var knobOptions = knobStore.get(name);
      knobOptions.value = value;
      this.forceUpdate();
    }
  }, {
    key: 'resetKnobs',
    value: function resetKnobs() {
      var knobStore = this.props.knobStore;

      knobStore.reset();
      this.forceUpdate();
      this.setPaneKnobs();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var storyFn = _props2.storyFn;
      var context = _props2.context;

      return _react2.default.createElement(
        'div',
        null,
        storyFn(context)
      );
    }
  }]);
  return WrapStory;
}(_react2.default.Component);

exports.default = WrapStory;


WrapStory.propTypes = {
  context: _react2.default.PropTypes.object,
  storyFn: _react2.default.PropTypes.func,
  channel: _react2.default.PropTypes.object,
  knobStore: _react2.default.PropTypes.object
};