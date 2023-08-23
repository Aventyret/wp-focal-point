<?php
/**
 * Gets focal point values for an image.
 *
 * @param integer $image_id The post id of the image.
 * @return array Array with the X and Y position of the image as floats.
 */
function wp_fp_get_values($image_id) {
  $focal_point = get_post_meta($image_id, 'wp_focal_point_values', true);

  if($focal_point) {
    $focal_point_parts = explode(',', $focal_point);

    if(count($focal_point_parts) == 2) {
      return array(
        'x' => floatval($focal_point_parts[0]),
        'y' => floatval($focal_point_parts[1])
      );
    }
  }

  return array(
    'x' => 0.5,
    'y' => 0.5
  );
}
