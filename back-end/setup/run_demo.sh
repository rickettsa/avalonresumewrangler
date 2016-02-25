#!/bin/bash
echo "starting Resume Wrangler Demo.."
open -a Terminal /Users/mbk/bin/es/es220/bin/elasticsearch &
sleep 10
open -a Terminal /Users/mbk/bin/es/kibana441/bin/kibana &
sleep 10
echo "starting python api.."
/usr/local/bin/python /Users/mbk/dev/resumeWrangler/avalonresumewrangler/back-end/api/app/app.py
sleep 10
echo "starting front end.."
cd /Users/mbk/dev/resumeWrangler/avalonresumewrangler/front-end
open -a Terminal `/usr/local/bin/grunt watch`
