{if !$userIsSiteAdmin}
    <p>{translate key="plugins.generic.userRolesExpiration.expireRole.forbidden"}</p>
{else}
    <div id="roleExpiration">
        <div id="description">{translate key="plugins.generic.userRolesExpiration.expireRole.description"}</div>
        <br>
        <form class="pkp_form" id="roleExpirationForm" method="post" action="{url router=$smarty.const.ROUTE_COMPONENT op="manage" category="generic" plugin=$pluginName verb="settings" save=true}">
            {include file="controllers/notification/inPlaceNotification.tpl" notificationId="roleExpirationFormNotification"}

            {fbvFormArea id="roleExpirationFormArea"}
                {fbvFormButtons id="roleExpirationFormSubmit" submitText="plugins.generic.userRolesExpiration.expire" hideCancel=true}
            {/fbvFormArea}
        </form>
    </div>
{/if}