#!/bin/bash
open -a Terminal /Users/mbk/bin/es/es220/bin/elasticsearch &
sleep 20
open -a Terminal `/usr/local/bin/python /Users/mbk/dev/resumeWrangler/avalonresumewrangler/back-end/api/app/app.py`
sleep 20
cd /Users/mbk/dev/resumeWrangler/avalonresumewrangler/front-end
open -a Terminal `/usr/local/bin/grunt watch`
