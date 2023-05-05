<?php

namespace App\Policies;

use App\Models\FileUpload;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class FileUploadPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any file uploads.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function viewAny(User $user)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can view the file upload.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\FileUpload  $fileUpload
     * @return mixed
     */
    public function view(User $user, FileUpload $fileUpload)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can create file uploads.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can update the file upload.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\FileUpload  $fileUpload
     * @return mixed
     */
    public function update(User $user, FileUpload $fileUpload)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can delete the file upload.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\FileUpload  $fileUpload
     * @return mixed
     */
    public function delete(User $user, FileUpload $fileUpload)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can restore the file upload.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\FileUpload  $fileUpload
     * @return mixed
     */
    public function restore(User $user, FileUpload $fileUpload)
    {
        //
        return true;
    }

    /**
     * Determine whether the user can permanently delete the file upload.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\FileUpload  $fileUpload
     * @return mixed
     */
    public function forceDelete(User $user, FileUpload $fileUpload)
    {
        //
        return true;
    }
}
