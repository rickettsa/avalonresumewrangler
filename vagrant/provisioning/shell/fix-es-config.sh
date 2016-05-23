echo "script.inline : on" >> /etc/elasticsearch/elasticsearch.yml
echo "script.indexed : on" >> /etc/elasticsearch/elasticsearch.yml
sed -i '/script.disable_dynamic/d' /etc/elasticsearch/elasticsearch.yml
sed -i 's/.*network.host.*/network.host: 192.168.33.10/g' /etc/elasticsearch/elasticsearch.yml
