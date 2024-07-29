# User Roles Expiration
This plugin allows administrators to expire a role among the roles present in a journal, meaning that all users who have the chosen role will lose it.

## Compatibility

The latest release of this plugin is compatible with the following PKP applications:

* OJS 3.4.0

Using PHP 8.1 or later.

## Plugin Download

To download the plugin, go to the [Releases page](https://github.com/lepidus/userRolesExpiration/releases) and download the tar.gz package of the latest release compatible with your website.

## Installation

1. Install the plugin dependencies.
2. Enter the administration area of ​​your application and navigate to `Settings`>` Website`> `Plugins`> `Upload a new plugin`.
3. Under __Upload file__ select the file __userRolesExpiration.tar.gz__.
4. Click __Save__ and the plugin will be installed on your website.

## Instructions for use
On the plugins page of your journal, you should find the item "User Roles Expiration", which corresponds to this plugin. In its options, you shall find one called "Expire role". Clicking on it will open a dialog panel, where you will be asked to select a role to expire among the ones present in the journal.

After selecting the role and clicking on "Expire", the role will be expired. Accessing the page "User & Roles" and the tab "Users", you will notice that all users who had the role don't have it anymore. It means that the role has been expired succesfully.

This feature is only available for administrator users. It also doesn't affect the user who executes the action, if it has the role which has been expired.

## License

__This plugin is licensed under the GNU General Public License v3.0__

__Copyright (c) 2024 Lepidus Tecnologia__

__Copyright (c) 2024 SciELO__