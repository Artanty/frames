<?php

namespace App\Http\Controllers;
use App\Models\Folder;
use Illuminate\Http\Request;
use DB;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $folders = Folder::select('*')
            ->where('creator_id', auth()->guard('api')->user()->id)
            ->get();
        return $folders;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $folder = new Folder;
        $folder->name = $request->name;
        $folder->creator_id = auth()->guard('api')->user()->id;
        $folder->save();

        return $folder;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function show(Folder $folder)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function edit(Folder $folder)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Folder $folder)
    {
        $folder = DB::table('folders')
        ->where('creator_id', auth()->guard('api')->user()->id)
        ->where('id', request()->id)
        ->update(
            ['name' => request()->name]
        );
        return $folder;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\models\Folder  $folder
     * @return \Illuminate\Http\Response
     */
    public function destroy(Folder $folder)
    {
        //
    }
}
