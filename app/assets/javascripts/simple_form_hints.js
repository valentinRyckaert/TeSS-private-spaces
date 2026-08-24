// Convert input/select/textarea `title` attributes into inline hint elements
// Runs on Turbolinks load and initial ready state
(function() {
  function insertHints() {
    if (typeof jQuery === 'undefined') return;
    var $ = jQuery;
    $('.form-group').each(function() {
      var $group = $(this);
      $group.find('input[title], textarea[title], select[title]').each(function() {
        var $field = $(this);
        var title = $field.attr('title');
        if (!title) return;
        // don't duplicate
        if ($group.find('.inline-hint-from-title').length) return;
        var $label = $group.find('label').first();
        var $hint = $('<p class="help-block inline-hint-from-title">').text(title);
        if ($label.length) {
          $label.after($hint);
        } else {
          // fallback: insert before the field
          $field.before($hint);
        }
        $field.removeAttr('title');
      });
    });
  }

  if (document.addEventListener) {
    document.addEventListener('turbolinks:load', insertHints, false);
    document.addEventListener('DOMContentLoaded', insertHints, false);
  }
})();
