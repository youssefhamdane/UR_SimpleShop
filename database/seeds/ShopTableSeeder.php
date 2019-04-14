<?php

use Illuminate\Database\Seeder;

class ShopTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = json_decode(file_get_contents(__DIR__.'/../../resources/db_data/shops.json'), true);
        foreach ($data as $value) {
            $line=array();
            foreach ($value as $key=>$content) $line[$key]=$content;
            \App\Shop::create($line);
        }
    }
}
