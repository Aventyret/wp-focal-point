<?php
class Wp_focal_point_fields {
  public static function edit_focal_point_button( $form_fields, $post ) {

    if(in_array($post->post_mime_type, ['image/webp','image/jpeg','image/png'])) {
      $focal_point = wp_fp_get_values($post->ID);
      $html = '';
      $html .= '<a class="button wp-fp-open" href="#" data-wp-fp-id="' . $post->ID . '" data-wp-fp-x="' . $focal_point['x'] . '" data-wp-fp-y="' . $focal_point['y'] . '">';
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
