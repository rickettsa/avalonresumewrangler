PATH=/bin:/usr/bin
THEDIR=/tmp/apache-watchdog
EMAIL=yourself@example.com
mkdir -p $THEDIR

if ( wget --timeout=30 -q -P $THEDIR http://localhost/robots.txt )
then
    # we are up
    touch ~/.apache-was-up
else
    # down! but if it was down already, don't keep spamming
    if [[ -f ~/.apache-was-up ]]
    then
        # write a nice e-mail
        echo -n "apache crashed at " > $THEDIR/mail
        date >> $THEDIR/mail
        echo >> $THEDIR/mail
        echo "Access log:" >> $THEDIR/mail
        tail -n 30 /var/log/apache2_access/current >> $THEDIR/mail
        echo >> $THEDIR/mail
        echo "Error log:" >> $THEDIR/mail
        tail -n 30 /var/log/apache2_error/current >> $THEDIR/mail
        echo >> $THEDIR/mail
        # kick apache
        echo "Now kicking apache..." >> $THEDIR/mail
        /etc/init.d/apache2 stop >> $THEDIR/mail 2>&1
        killall -9 apache2 >> $THEDIR/mail 2>&1
        /etc/init.d/apache2 start >> $THEDIR/mail 2>&1
        # send the mail
        echo >> $THEDIR/mail
        echo "Good luck troubleshooting!" >> $THEDIR/mail
        mail -s "apache-watchdog: apache crashed" $EMAIL < $THEDIR/mail
        rm ~/.apache-was-up
    fi
fi

rm -rf $THEDIR