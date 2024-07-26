<?php

namespace  APP\plugins\generic\userRolesExpiration\classes;

use PKP\db\DAO;
use Illuminate\Support\Facades\DB;

class RoleExpirationDAO extends DAO
{
    public function expireRole(int $userGroupId, int $userId)
    {
        $affectedRowsNumber = DB::table('user_user_groups')
            ->where('user_group_id', $userGroupId)
            ->where('user_id', '!=', $userId)
            ->delete();
    }
}
