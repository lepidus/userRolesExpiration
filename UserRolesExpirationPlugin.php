<?php

namespace APP\plugins\generic\userRolesExpiration;

use PKP\plugins\GenericPlugin;
use APP\core\Application;
use PKP\plugins\Hook;
use PKP\linkAction\LinkAction;
use PKP\linkAction\request\AjaxModal;
use PKP\core\JSONMessage;
use APP\plugins\generic\userRolesExpiration\form\RoleExpirationForm;

class UserRolesExpirationPlugin extends GenericPlugin
{
    public function register($category, $path, $mainContextId = null): bool
    {
        $success = parent::register($category, $path, $mainContextId);

        if (Application::isUnderMaintenance()) {
            return $success;
        }

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

    public function getActions($request, $actionArgs)
    {
        $actions = parent::getActions($request, $actionArgs);

        if (!$this->getEnabled()) {
            return $actions;
        }

        $router = $request->getRouter();
        $linkAction = new LinkAction(
            'expireRole',
            new AjaxModal(
                $router->url(
                    $request,
                    null,
                    null,
                    'manage',
                    null,
                    [
                        'verb' => 'expireRole',
                        'plugin' => $this->getName(),
                        'category' => 'generic'
                    ]
                ),
                $this->getDisplayName()
            ),
            __('plugins.generic.userRolesExpiration.expireRole.title'),
            null
        );

        return array_merge([$linkAction], $actions);
    }

    public function manage($args, $request)
    {
        switch ($request->getUserVar('verb')) {
            case 'expireRole':
                $context = $request->getContext();
                $form = new RoleExpirationForm($this, $context->getId());

                if ($request->getUserVar('save')) {
                    $form->readInputData();
                    if ($form->validate()) {
                        $form->execute();
                        return new JSONMessage(true);
                    }
                }

                return new JSONMessage(true, $form->fetch($request));
            default:
                return parent::manage($args, $request);
        }
    }
}
