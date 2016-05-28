'use strict';

define(['jquery', 'lodash'], function ($, _) {
  var Messages, $messages;

  var template = _.template(
    '<div class="message <%=type%>">'+
      '<div class="content">'+
        '<i class="icon-<%=type%>"></i><%=message%>'+
        '<i class="icon-x"></i>'+
      '</div>'+
    '</div>'
  );

  Messages = function(group) {
    this.enabled = true;
    this.group = group || 'general';
    this.$messages = $('<div class="messages-'+group+'">').appendTo($messages);

    return this;
  };

  Messages.prototype.enable = function () {
    this.enabled = true;
  };

  Messages.prototype.disable = function () {
    this.enabled = false;
  };

  Messages.prototype.add = function (message, seconds, group, type) {
    if (!this.enabled) {
      return;
    }

    var $message = $(template({
      type: type,
      group: group ? group : this.group,
      message: message
    }));
    this.$messages.append($message);
    $message.grow();

    if (seconds) {
      setTimeout(_.bind(remove_message, $message), seconds*1000);
    }
  };

  Messages.prototype.clear = function (type, group) {
    this.$messages.children(type ? '.'+type : '').remove();
    if (!$messages.find('.message.error').length) {
      $('body').removeClass('error');
    }
  };

  Messages.prototype.clear_all = function (type) {
    $messages.find('.message'+(type ? '.'+type : '')).remove();
    if (!$messages.find('.message.error').length) {
      $('body').removeClass('error');
    }
  };

  Messages.prototype.success = function (message, seconds, group) {
    this.add(message, seconds, group, 'success');
  };

  Messages.prototype.warning = function (message, seconds, group) {
    this.add(message, seconds, group, 'warning');
  };

  Messages.prototype.error = function (message, seconds, group) {
    this.add(message, seconds, group, 'error');
    $('body').addClass('error editmode').removeClass('playmode');
  };

  Messages.prototype.help = function (message, seconds, group) {
    this.add(message, seconds, group, 'help');
  };

  Messages.prototype.info = function (message, seconds, group) {
    this.add(message, seconds, group, 'info');
  };

  function remove_message() {
    var $message = $(this);
    if (!$message.hasClass('message')) {
      $message = $message.closest('.message');
    }
    $message.shrink(function () {
      this.remove();
    });
  }

  $(function () {
    $messages = $('#messages');
    $messages.on('click', 'i.icon-x', remove_message);
  });

  return Messages;

});
