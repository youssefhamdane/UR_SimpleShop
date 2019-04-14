<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;

class Shop extends Model {
	/**
	 * Get nearby shops ordered by distance ASC
	 *
	 * @param  int $user_id User ID
	 * @param string $lat Optional coordinate latitude
	 * @param string $lon Optional coordinate longitude
	 *
	 * @return array    Array of Shops
	 */
	static function getNearbyShops( $user_id, $lat = null, $lon = null ) {
		$curr_date      = date( 'Y-m-d H:i:s' );
		$twohour_before = date( 'Y-m-d H:i:s', ( time() - 60 * 60 * 2 ) );
		if ( isset( $lat ) && isset( $lon ) && is_numeric( $lat ) && is_numeric( $lon ) ) {
			//calcule distance source : https://stackoverflow.com/a/10771017/8316637
			return DB::table( 'shops' )
			         ->select( DB::raw(
				         "id,name,picture,email,city,coordinate_latitude,coordinate_longitude, ( 3959 * acos( cos( radians(" . $lat . ") ) * cos( radians( coordinate_latitude ) ) * cos( radians( coordinate_longitude ) - 
                radians(" . $lon . ") ) + 
                sin( radians(" . $lat . ") ) * 
                sin( radians( coordinate_latitude ) ) ) )  as distanse"
			         ) )
			         ->whereNotIn( "shops.id", function ( $q ) use ( $user_id, $curr_date, $twohour_before ) {
				         $q->select( 'shop_id' )->from( 'user_shops' )
				           ->where( 'status', '=', 0 )
				           ->where( 'user_id', '=', $user_id )
				           ->where( 'updated_at', '>=', $twohour_before )
				           ->where( 'updated_at', '<=', $curr_date );
			         } )
			         ->orderBy( 'distanse', 'ASC' )->get();
		} else {
			return DB::table( 'shops' )
			         ->select( DB::raw(
				         "*"
			         ) )
			         ->whereNotIn( "shops.id", function ( $q ) use ( $user_id, $curr_date, $twohour_before ) {
				         $q->select( 'shop_id' )->from( 'user_shops' )
				           ->where( 'status', '=', 0 )
				           ->where( 'user_id', '=', $user_id )
				           ->where( 'updated_at', '>=', $twohour_before )
				           ->where( 'updated_at', '<=', $curr_date );
			         } )->get();
		}
	}

	/**
	 * Get preferred shops ordered by date DESC
	 *
	 * @param  int $user_id User ID
	 *
	 * @return array    Array of Shops
	 */
	static function getPreferredShops( $user_id ) {
		return DB::table( 'shops' )
		         ->select( DB::raw(
			         "shops.id,shops.name,shops.picture,shops.email,shops.city,shops.coordinate_latitude,shops.coordinate_longitude"
		         ) )
		         ->join( 'user_shops', 'shops.id', '=', 'user_shops.shop_id' )
		         ->join( 'users', 'users.id', '=', 'user_shops.user_id' )
		         ->where( 'user_shops.status', '=', 1 )
		         ->where( 'user_shops.user_id', '=', $user_id )
		         ->orderBy( 'user_shops.updated_at', 'DESC' )->get();
	}
}
