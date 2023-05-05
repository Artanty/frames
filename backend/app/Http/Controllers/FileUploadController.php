<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Collection;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\FileUpload;


use DB;


class FileUploadController extends Controller
{
    public function __construct()
    {}

    public function get(Request $request)
    {
        $model = FileUpload::where('userId', auth()->user()->id)->get();
        return $model;
    }

    public function store(Request $request)
    {
        // $columns['title'] = $request->title;
        // $columns['folderId'] = 6000;
        // $columns['userId'] = 999;

        // $model = new FileUpload;
        // $model->fill($columns)->save();

        return response()->json($columns);

    }
    public function update(Request $request)
    {
      $pictures = DB::table('pictures')
            ->where('userId', auth()->user()->id)
            ->where('id', request()->id)
            ->update(
              ['text' => request()->text,
              'title' => request()->title]
          );

      return response()->json($pictures);
    }

    public function delete(Request $request)
    {
      $pictures = DB::table('pictures')
            ->where('userId', auth()->user()->id)
            ->where('id', request()->id)
            ->delete();

      return response()->json($pictures);
    }
}
