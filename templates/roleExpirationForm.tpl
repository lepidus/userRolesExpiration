{if !$userIsSiteAdmin}
    <p>{translate key="plugins.generic.userRolesExpiration.expireRole.forbidden"}</p>
{else}
    <script type="text/javascript">
        $(function() {ldelim}
            $('#roleExpirationForm').pkpHandler('$.pkp.controllers.form.AjaxFormHandler');
        {rdelim});
    </script>
    
    <div id="roleExpiration">
        <div id="description">{translate key="plugins.generic.userRolesExpiration.expireRole.description"}</div>
        <br>
        <form class="pkp_form" id="roleExpirationForm" method="post" action="{url router=$smarty.const.ROUTE_COMPONENT op="manage" category="generic" plugin=$pluginName verb="expireRole" save=true}">
            {include file="controllers/notification/inPlaceNotification.tpl" notificationId="roleExpirationFormNotification"}

            {fbvFormArea id="roleExpirationFormArea"}
                {fbvFormSection for="roleSelected" title="plugins.generic.userRolesExpiration.selectRole"}
                    {fbvElement type="select" label="common.role" name="roleSelected" id="roleSelected" required=true from=$contextUserGroups translate="0" size=$fbvStyles.size.MEDIUM}
                {/fbvFormSection}

                {fbvFormButtons id="roleExpirationFormSubmit" submitText="plugins.generic.userRolesExpiration.expire" hideCancel=true}
            {/fbvFormArea}
        </form>
    </div>
{/if}