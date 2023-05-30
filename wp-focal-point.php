<?php
/*
Plugin Name: WP Focal Point
Plugin URI: https://github.com/aventyret/wp-focal-point
Description: Brings focal point settings to images in the Wordpress Media Library
Author: Äventyret
Author URI: https://aventyret.com
Version: 0.0.1
*/

if (basename($_SERVER['PHP_SELF']) == basename(__FILE__)){
    die('Invalid URL');
}

if (defined('WP_FOCAL_POINT'))
{
    die('Invalid plugin access');
}

define('WP_FOCAL_POINT',  __FILE__ );
define('WP_FOCAL_POINT_DIR', plugin_dir_path( __FILE__ ));
define('WP_FOCAL_POINT_URI', plugin_dir_url( __FILE__ ));
define('WP_FOCAL_POINT_VER', "0.0.1");

require_once(WP_FOCAL_POINT_DIR . 'includes/fields.php');
require_once(WP_FOCAL_POINT_DIR . 'public/hooks.php');
