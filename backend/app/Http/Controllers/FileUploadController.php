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
        $model = FileUpload::select('*')
        ->where('creator_id', auth()->guard('api')->user()->id)
        ->get();
        return $model;
    }

    public function store(Request $request)
    {
        $columns['fileId'] = $request->fileId;
        $columns['fileType'] = $request->fileType;
        $columns['fileName'] = $request->fileName;
        $columns['fileUrl'] = $request->fileUrl;
        $columns['thumbnailUrl'] = $request->thumbnailUrl;
        $columns['size'] = $request->size;
        $columns['width'] = $request->width;
        $columns['height'] = $request->height;
        $columns['tags'] = $request->tags;
        $columns['isPrivateFile'] = $request->isPrivateFile;
        $columns['userId'] = auth()->guard('api')->user()->id;
        $columns['folderId'] = $request->folderId;
        $model = new FileUpload;
        $model->fill($columns)->save();
        return response()->$model;
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
