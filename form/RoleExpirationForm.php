<?php

namespace APP\plugins\generic\userRolesExpiration\form;

use PKP\form\Form;
use APP\template\TemplateManager;
use APP\facades\Repo;
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
        $context = $request->getContext();

        $templateMgr = TemplateManager::getManager($request);
        $templateMgr->assign('pluginName', $this->plugin->getName());
        $templateMgr->assign('userIsSiteAdmin', Validation::isSiteAdmin());
        $templateMgr->assign('contextUserGroups', $this->getContextUserGroups($context));

        return parent::fetch($request, $template, $display);
    }

    private function getContextUserGroups($context): array
    {
        $userGroups = Repo::userGroup()->getCollector()
            ->filterByContextIds([$context->getId()])
            ->getMany()
            ->toArray();

        $userGroupsNames = [];
        foreach ($userGroups as $userGroup) {
            $userGroupsNames[$userGroup->getId()] = $userGroup->getLocalizedName();
        }

        return $userGroupsNames;
    }

    public function readInputData(): void
    {
        $this->readUserVars(['roleSelected']);
    }

    public function execute(...$functionArgs)
    {
        error_log('ai oh ' . $this->getData('roleSelected'));
    }
}
