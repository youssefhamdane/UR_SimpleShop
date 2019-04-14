<?php

namespace App\Http\Controllers;

use App\Shop;
use App\UserShops;
use Illuminate\Http\Request;
use Auth;
class ShopController extends Controller
{
	/**
	 * Get nearby shops
	 *
	 * @param Request $request
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function index(Request $request)
    {
        $shops=Shop::getNearbyShops(Auth::user()->id,$request->input('latitude'),$request->input('longitude'));
        return response()->json($shops, 201);
    }

	/**
	 * Get liked shops
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function liked()
    {
        $shops=Shop::getPreferredShops(Auth::user()->id);
        return response()->json($shops, 201);
    }

	/**
	 *  Submit like shop
	 *
	 * @param Request $request
	 * @param Shop $shop
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function like(Request $request,Shop $shop)
    {
        $usershop = UserShops::firstOrNew(array('user_id'=>Auth::user()->id,'shop_id' => $shop->id));
        $usershop->status = 1;
        $usershop->save();
        $shops=Shop::getNearbyShops(Auth::user()->id,$request->input('latitude'),$request->input('longitude'));
        return response()->json($shops, 201);
    }

	/**
	 * Submit diskile shop
	 *
	 * @param Request $request
	 * @param Shop $shop
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function dislike(Request $request,Shop $shop)
    {
        $usershop = UserShops::firstOrNew(array('user_id'=>Auth::user()->id,'shop_id' => $shop->id));
        $usershop->status = 0;
        $usershop->save();
        $shops=Shop::getNearbyShops(Auth::user()->id,$request->input('latitude'),$request->input('longitude'));
        return response()->json($shops, 201);
    }

	/**
	 * Remove liked shops
	 *
	 * @param Request $request
	 * @param Shop $shop
	 *
	 * @return \Illuminate\Http\JsonResponse
	 */
    public function remove(Request $request,Shop $shop)
    {
        UserShops::where('shop_id',$shop->id)->where('user_id',Auth::user()->id)->delete();
        $shops=Shop::getPreferredShops(Auth::user()->id,$request->input('latitude'),$request->input('longitude'));
        return response()->json($shops, 201);
    }
}
