<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;
use ImageKit\ImageKit;
use App\Models\Upload;

class ImageKitController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }

    public function go(Request $request){ // todo delete?

        $columns = (array)$request->input('params');
        $columns['userId'] = auth()->user()->id;
        $public_key = env('IMAGE_KIT_PUBLIC_KEY');
        $your_private_key = env('IMAGE_KIT_PRIVATE_KEY');
        $url_end_point = "https://ik.imagekit.io/xdzsyg94tzap";

        $imageKit = new ImageKit(
            $public_key,
            $your_private_key,
            $url_end_point
        );

        $uploadFile = $imageKit->upload(array(
            'file' => "https://static.getpostman.com/assets/pm-logo-1.svg",
            'fileName' => "my_file_name.jpg"
        ));

        echo ("Upload URL" . json_encode($uploadFile));

    }
    private function instantiate () {
        $public_key = env('IMAGE_KIT_PUBLIC_KEY');
        $your_private_key = env('IMAGE_KIT_PRIVATE_KEY');
        $url_end_point = "https://ik.imagekit.io/xdzsyg94tzap";

        $imageKit = new ImageKit(
            $public_key,
            $your_private_key,
            $url_end_point
        );
        return $imageKit;
    }

    public function deleteImage(string $fileId){
        $imageKit = $this->instantiate();
        $result = $imageKit->deleteFile($fileId);

        return $result;

    }

    /**
     * @param string $imgTitle
     * @param string $imgData
     * @param $folder
     * @return string|string[] $fileUrl
     */
    public function saveImage(string $imgTitle = 'ttt', string $imgData, $folder){

        $imageKit = $this->instantiate();

        $response = $imageKit->upload(array(
            'file' => $imgData,
            'fileName' => $imgTitle,
            'folder' => $folder
        ));

        $fileUrl = $response->success->url;
        $result['fileUrl'] = str_replace('\\', '', $fileUrl);
        $thumbnailUrl = $response->success->thumbnailUrl;
        $result['thumbnailUrl'] = str_replace('\\', '', $thumbnailUrl);
        $result['fileId'] = $response->success->fileId;
        $result['fileName'] = $response->success->name;
        $result['size'] = $response->success->size;
        $result['width'] = $response->success->width;
        $result['height'] = $response->success->height;

        return $result;
    }
}
