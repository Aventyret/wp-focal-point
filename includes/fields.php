<?php
class Wp_focal_point_fields {
  public static function edit_focal_point_button( $form_fields, $post ) {

    if(in_array($post->post_mime_type, ['image/webp','image/jpeg','image/png'])) {
      $html = '';
      $html .= '<a class="button" href="#" data-wp-focal-point="' . $post->ID . '">';
      $html .= '<span class="wp-media-buttons-icon"></span>' . __('Set focal point', "wp-focal-point");
      $html .= '</a>';

      $form_fields['wpfocalpoint'] = [
        'label' => '&nbsp;',
        'input' => 'html',
        'html' => $html
      ];
    }
    return $form_fields;
  }
}
