<?php
add_action( 'admin_enqueue_scripts', function() {
  wp_enqueue_script( 'wp-focal-point', WP_FOCAL_POINT_URI . 'public/wp-focal-point.js', NULL, WP_FOCAL_POINT_VER, true );
});

add_filter( 'attachment_fields_to_edit', 'Wp_focal_point_fields::edit_focal_point_button', 10, 2);
