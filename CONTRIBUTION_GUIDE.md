# Contributing Guide
### Choosing Stories/tickets.

When deciding on an issue to work on, look for the  `Help Wanted` or `Good First Issue` tags.

### How to create a feature branch

```
git checkout develop
```
``` 
git pull upstream develop
```

Ensure you have setup AgileVentures/WebsiteOne-FE's upstream  `develop`.  Otherwise you will not have the latest `develop ` changes.

To confirm this, run ```git remote -v```.

You should see a simillar output.

```
origin  https://github.com/yourgithubusername/WebsiteOne-FE.git (fetch)
origin  https://github.com/yourgithubusername/WebsiteOne-FE.git (push)
upstream    https://github.com/AgileVentures/WebsiteOne-FE (fetch)
upstream    https://github.com/AgileVentures/WebsiteOne-FE (push)
```

If not, you need to set the remote develop in order to get the latest copy once changes are merged.

Inorder to achieve that, run:

```
git remote add upstream https://github.com/AgileVentures/WebsiteOne-FE
```

```
git pull upstream develop
```

This depends on the name of your origin (Counter check before running the above command).

You will now have the latest copy of develop in your local.


Once this is done, you can proceed with naming your branch following the below convention.

### Branch Naming Conventions

``` 
git checkout -b 17-add-agileventures-logo
```


Where `17` is the ticket number and `add-agileventures-logo ` is a short description of the purpose of your branch.

### Commit Messages

Ensure your commit message clearly communicate the work you have done.

For example,
```
git commit -m "Implement user login"
```

### Pull Requests

For your Pull Requests, ensure you have a proper title describing your task.
Make sure to add a link to the ticket you've worked on and add any screenshots if necessary.


Your pull request needs to be reviewed by at least two people in the team for it to be merged in `delop` branch.