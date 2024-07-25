<?php

namespace APP\plugins\generic\userRolesExpiration\form;

use PKP\form\Form;
use APP\template\TemplateManager;
use PKP\security\Validation;

class RoleExpirationForm extends Form
{
    public $contextId;
    public $plugin;

    public function __construct($plugin, $contextId)
    {
        $this->contextId = $contextId;
        $this->plugin = $plugin;
        parent::__construct($plugin->getTemplateResource('roleExpirationForm.tpl'));
    }

    public function fetch($request, $template = null, $display = false)
    {
        $templateMgr = TemplateManager::getManager($request);
        $templateMgr->assign('userIsSiteAdmin', Validation::isSiteAdmin());

        return parent::fetch($request, $template, $display);
    }
}
