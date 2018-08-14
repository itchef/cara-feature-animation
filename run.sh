#!/bin/bash -e

automation_path=`pwd`
echo "<<<<<<<<<<<<< Restoring with clean database  >>>>>>>>>>>>>>>>>"
cd ../cara-api
bin/rails app:setup
bin/rails app:add_data
echo "<<<<<<<<<<<<< Running tests >>>>>>>>>>>>>>>>>"
cd ${automation_path}
yarn test