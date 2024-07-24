<?php

namespace APP\plugins\generic\userRolesExpiration;

use PKP\plugins\GenericPlugin;
use APP\core\Application;
use PKP\plugins\Hook;

class UserRolesExpirationPlugin extends GenericPlugin
{
    public function register($category, $path, $mainContextId = null): bool
    {
        $success = parent::register($category, $path, $mainContextId);

        if (Application::isUnderMaintenance()) {
            return $success;
        }

        // if ($success && $this->getEnabled($mainContextId)) {
        // }

        return $success;
    }

    public function getDisplayName()
    {
        return __('plugins.generic.userRolesExpiration.displayName');
    }

    public function getDescription()
    {
        return __('plugins.generic.userRolesExpiration.description');
    }
}
