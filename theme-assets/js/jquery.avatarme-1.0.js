/*
 *  jQuery avatarMe 1.0
 *  http://github.com/lbphuc/jquery-avatarMe
 *
 *  Copyright (c) 2014 Le Bao Phuc
 *  http://lebaophuc.com/
 *
 *  Licensed under the MIT
 *  http://en.wikipedia.org/wiki/MIT_License
 */
(function ($, window, document, undefined) {
  'use strict';

  //defaults
  var
    pluginName = "avatarMe",
    defaults = {
      className: 'avatar-me',
      maxChar: 3
    };

  //the actual plugin constructor
  function Plugin(element, options) {
    this.element = element;
    this.settings = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  }

  //avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      this.createAvatar(this.element, this.settings);
    },
    createAvatar: function (element, settings) {

      //init
      var
        $element = $(element),
        $avatar = $('<span class="' + settings.className + '"></span>'),
        $wrapper = $('<div class="' + settings.className + '-wrapper' + '"></div>'),
        words = $element.html().replace(/[&\/\\#,+\-()$~%.'":*?<>{}]/g, '').split(' '),
        character = '';

      //markup
      $wrapper.insertAfter($element);
      $avatar.appendTo($wrapper);
      $element.appendTo($wrapper);

      //action
      if (words !== '') {
        $.each(words, function (index, value) {
          if (index < settings.maxChar) {
            character += value[0];
          }
        });
      } else {
        character += '...';
      }
      $avatar.html(character);

    }
  });

  //a really lightweight plugin wrapper around the constructor,
  //preventing against multiple instantiations
  $.fn[pluginName] = function (options) {
    this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName, new Plugin(this, options));
      }
    });
    return this;
  };

})(jQuery, window, document);