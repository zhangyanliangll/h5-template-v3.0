#!/bin/bash

CURRENT_BRANCH=`git symbolic-ref --short -q HEAD`

DATETIME=`date "+%Y-%m-%d %H:%M:%S"`

if [ "$CURRENT_BRANCH" == "$TARGET_BRANCH" ]; then
  echo -e "\n\033[33mOops, you are now on the branch '$CURRENT_BRANCH'.\033[0m"
  exit -1
# else
#   echo -e "\n\033[32mCurrent branch is '$CURRENT_BRANCH'.\033[0m"
fi

git checkout $SOURCE_BRANCH
git branch -D $TARGET_BRANCH
git checkout -b $TARGET_BRANCH

if [ $? -eq 0 ]; then

  if [ $TARGET_BRANCH == 'staging' ]; then
    npm run build:prod
  else
    npm run build:test
  fi

  if [ $? -eq 0 ]; then

    rm -f $PACKAGE_NAME.zip
    zip -r $PACKAGE_NAME.zip $PACKAGE_NAME

    if [ $? -eq 0 ]; then

      git add $PACKAGE_NAME.zip
      git commit -m"chore(build-project): $DATETIME"
      git push --set-upstream origin $TARGET_BRANCH -f

      if [ $? -eq 0 ]; then
        git checkout $CURRENT_BRANCH
        echo -e "\n\033[32mBuild succeed.\033[0m"
      fi

    fi
  fi
fi
