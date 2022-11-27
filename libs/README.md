### Publishing packages
Got few issues with publishing packages to private github repository, even with correct `.npmrc` and publish config. Publishing failed requesting login to npm.

```
rush publish --apply --publish --target-branch develop --npm-auth-token $GITHUB_PUBLISH_TOKEN --add-commit-details --include-all -r https://npm.pkg.github.com/
```