var express = require('express');
var router = express.Router();
var request = require('request');
var _ = require('lodash');

var skills = [
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "0bc8d07e-c118-4bdb-8eaa-3a8302e6885f",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "DataStax"
            },
            {
              "name": "Hadoop"
            },
            {
              "name": "Hive"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "MongoDB"
            },
            {
              "name": "Mule"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "NodeJS"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "Pig"
            },
            {
              "name": "RapidMinor"
            },
            {
              "name": "Talend"
            },
            {
              "name": "Vectorwise"
            },
            {
              "name": "CSS"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "HDFS"
            },
            {
              "name": "HQL"
            },
            {
              "name": "Java"
            },
            {
              "name": "JSON"
            },
            {
              "name": "PHP"
            },
            {
              "name": "REST"
            },
            {
              "name": "Spring"
            },
            {
              "name": "SQL"
            },
            {
              "name": "XML"
            },
            {
              "name": "XPath"
            },
            {
              "name": "XQuery"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "17d02429-22c8-44c8-b936-ed44d8c09f34",
        "_score": 1,
        "_source": {
          "skills": []
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "399516e8-7831-470c-8a20-6c1ddcd7cb73",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Microsoft Windows"
            },
            {
              "name": ".NET"
            },
            {
              "name": "HTML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "PHP"
            },
            {
              "name": "Java"
            },
            {
              "name": "J2EE"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Dreamweaver"
            },
            {
              "name": "NetBeans"
            },
            {
              "name": "XML"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Portal 7.x"
            },
            {
              "name": "WEM 7.x"
            },
            {
              "name": "Velocity"
            },
            {
              "name": "Google Search Appliance"
            },
            {
              "name": "Apache"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "WebLogic"
            },
            {
              "name": "Object Oriented"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "427a8b48-cd9a-4bcd-8f1f-6c8dad6d2eb0",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "XQuery"
            },
            {
              "name": "XML"
            },
            {
              "name": "XPath"
            },
            {
              "name": "ColdFusion"
            },
            {
              "name": "Flex"
            },
            {
              "name": "Java"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "PERL"
            },
            {
              "name": "Maven"
            },
            {
              "name": "SQL"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "C++"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "Dreamweaver"
            },
            {
              "name": "Flash"
            },
            {
              "name": "Adobe Photoshop"
            },
            {
              "name": "InDesign"
            },
            {
              "name": "FrameMaker"
            },
            {
              "name": "Quark"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "Sybase"
            },
            {
              "name": "Linux"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Solaris"
            },
            {
              "name": "SGI"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "4468c86a-f1ba-43d5-8423-f047c4482055",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "C"
            },
            {
              "name": "C++"
            },
            {
              "name": ".NET"
            },
            {
              "name": "Java"
            },
            {
              "name": "JSP"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MS Access"
            },
            {
              "name": "Apache"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "IIS"
            },
            {
              "name": "WebLogic"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "NetBeans"
            },
            {
              "name": "Visual Studio"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "Sublime"
            },
            {
              "name": "Notepad++"
            },
            {
              "name": "SVN"
            },
            {
              "name": "Git"
            },
            {
              "name": "Harvest"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Liferay"
            },
            {
              "name": "Ingeniux"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "4bf6837b-0051-4af4-a160-f9afd647d53a",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "REST"
            },
            {
              "name": "Struts"
            },
            {
              "name": "JSF"
            },
            {
              "name": "J2EE"
            },
            {
              "name": "EJB"
            },
            {
              "name": "Spring"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "JDBC"
            },
            {
              "name": "Hibernate"
            },
            {
              "name": "Apache"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": ".NET"
            },
            {
              "name": "IIS"
            },
            {
              "name": "Selenium"
            },
            {
              "name": "ElasticPath"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "Jdeveloper"
            },
            {
              "name": "TOAD"
            },
            {
              "name": "jProfiler"
            },
            {
              "name": "Jenkins"
            },
            {
              "name": "grinder"
            },
            {
              "name": "Agile SCRUM"
            },
            {
              "name": "Iterative"
            },
            {
              "name": "Waterfall"
            },
            {
              "name": "ClearCase"
            },
            {
              "name": "SVN"
            },
            {
              "name": "CVS"
            },
            {
              "name": "Git"
            },
            {
              "name": "Ant"
            },
            {
              "name": "Hudson CI 1.3"
            },
            {
              "name": "Maven"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MS Access"
            },
            {
              "name": "Sybase"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "58c7931f-57c5-4d13-8ea3-a7b0d3a364a7",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Autonomy IDOL"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "Drupal"
            },
            {
              "name": "V8"
            },
            {
              "name": "Dynamic Portal Module"
            },
            {
              "name": "Dynamic Site Module"
            },
            {
              "name": "VB"
            },
            {
              "name": "Rich Media Manager"
            },
            {
              "name": "Apache Web Server"
            },
            {
              "name": "AWS"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Java"
            },
            {
              "name": "AJAX"
            },
            {
              "name": "DHTML"
            },
            {
              "name": "HTML"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "ANT"
            },
            {
              "name": "PHP"
            },
            {
              "name": "SQL"
            },
            {
              "name": "Kibana"
            },
            {
              "name": "ElasticSearch"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "71ccadbf-74ca-486d-846e-cd8c738f5aa0",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "project management"
            },
            {
              "name": "MS Project"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "IIS"
            },
            {
              "name": "Liferay"
            },
            {
              "name": "Storyline"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "87d88627-be9f-4f8a-a127-c69cd0b50ed5",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "XSLT"
            },
            {
              "name": "Data Modeling"
            },
            {
              "name": "schema development"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "Java"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "XML"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "RelaxNG"
            },
            {
              "name": "Python"
            },
            {
              "name": "PERL"
            },
            {
              "name": "SVN"
            },
            {
              "name": "Git"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "MongoDB"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "89d2ef9d-bee1-4e40-90bd-e0b27cc33505",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "HTML"
            },
            {
              "name": "DHTML"
            },
            {
              "name": "PERL"
            },
            {
              "name": "AJAX"
            },
            {
              "name": "Shell Scripts"
            },
            {
              "name": "Ant"
            },
            {
              "name": "SQL"
            },
            {
              "name": "C++"
            },
            {
              "name": "C"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "Pascal"
            },
            {
              "name": "GWT"
            },
            {
              "name": "Actionscript"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "XPath"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XQJ"
            },
            {
              "name": "J2EE"
            },
            {
              "name": "Servlets"
            },
            {
              "name": "JSP"
            },
            {
              "name": "JSTL"
            },
            {
              "name": "EJB"
            },
            {
              "name": "UML"
            },
            {
              "name": "MVC"
            },
            {
              "name": "Struts"
            },
            {
              "name": "Adobe Flex"
            },
            {
              "name": "JSF"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "JDBC"
            },
            {
              "name": "RMI"
            },
            {
              "name": "JNI"
            },
            {
              "name": "FrontPage"
            },
            {
              "name": "Dreamweaver"
            },
            {
              "name": "MyEclipse web editor"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MySQL"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "aa30808f-67e7-4057-97a8-643a10af56fa",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MS Office"
            },
            {
              "name": "Presenter"
            },
            {
              "name": "Engage"
            },
            {
              "name": "Quizmaker"
            },
            {
              "name": "Storyline"
            },
            {
              "name": "Adobe Captivate"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "e1603dbe-d412-47ed-acf5-f90c9376ab1e",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "XQuery"
            },
            {
              "name": "XPath"
            },
            {
              "name": "Java"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "AJAX"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "AWS"
            },
            {
              "name": "WordPress"
            },
            {
              "name": "Crystal Reports"
            },
            {
              "name": "Hadoop"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "eec9366b-5685-4890-9cb2-31ab0e87b0b8",
        "_score": 1,
        "_source": {
          "skills": []
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "f807a1ac-9aae-4145-9d91-e8fcb15c0db2",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "IDOL"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "Solr"
            },
            {
              "name": "Google Search Appliance"
            },
            {
              "name": "ACI API"
            },
            {
              "name": "CAP / IndexTasks"
            },
            {
              "name": "Lua"
            },
            {
              "name": "Java"
            },
            {
              "name": "Business Console"
            },
            {
              "name": "Retina"
            },
            {
              "name": "IAS/Security"
            },
            {
              "name": "Eduction"
            },
            {
              "name": "Ultraseek"
            },
            {
              "name": "ADP Enterprise"
            },
            {
              "name": "PeopleSoft"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "Informix"
            },
            {
              "name": "Sybase"
            },
            {
              "name": "DB2"
            },
            {
              "name": "R:Base"
            },
            {
              "name": "SQL"
            },
            {
              "name": "SQLBase"
            },
            {
              "name": "XDB"
            },
            {
              "name": "PostGreSQL"
            },
            {
              "name": "JSP"
            },
            {
              "name": "SQR"
            },
            {
              "name": "C"
            },
            {
              "name": "C++"
            },
            {
              "name": "ColdFusion"
            },
            {
              "name": "HTML"
            },
            {
              "name": "PHP"
            },
            {
              "name": "Powerbuilder"
            },
            {
              "name": "Gupta SQL Windows"
            },
            {
              "name": "Pascal"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "Python"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "DOS"
            },
            {
              "name": "OS/2"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "Linux"
            },
            {
              "name": "AIX"
            },
            {
              "name": "Solaris"
            },
            {
              "name": "HPUX"
            },
            {
              "name": "ElasticSearch"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "09d79180-da0f-4714-95d5-a44f161347a6",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "C#"
            },
            {
              "name": ".NET"
            },
            {
              "name": "C++"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "MVC"
            },
            {
              "name": "Java"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "TypeAhead"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "HTML"
            },
            {
              "name": "AJAX"
            },
            {
              "name": "SQL"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "DB2"
            },
            {
              "name": "SSIS"
            },
            {
              "name": "Entity Framework"
            },
            {
              "name": "Business Objects"
            },
            {
              "name": "Crystal Reports"
            },
            {
              "name": "FrontPage"
            },
            {
              "name": "Dameware"
            },
            {
              "name": "VMWare"
            },
            {
              "name": "Rational Rose"
            },
            {
              "name": "Visio"
            },
            {
              "name": "TFS"
            },
            {
              "name": "JIRA"
            },
            {
              "name": "TrackIt"
            },
            {
              "name": "Vault"
            },
            {
              "name": "MKS"
            },
            {
              "name": "Moq"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "23e6de2d-15e4-482d-8c43-2c03be1a9109",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "OpenText Portal"
            },
            {
              "name": "DPM"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Java"
            },
            {
              "name": "J2EE"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "XML"
            },
            {
              "name": ".NET"
            },
            {
              "name": "ASP.NET"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "WebLogic"
            },
            {
              "name": "IIS"
            },
            {
              "name": "Apache"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "Visio"
            },
            {
              "name": "DBM"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "Informix"
            },
            {
              "name": "Sybase"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "Linux"
            },
            {
              "name": "Solaris"
            },
            {
              "name": "UNIX"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "34bbff2d-0d44-45ca-82b0-2073c01ef4f9",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MarkLogic"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XPath"
            },
            {
              "name": "Java"
            },
            {
              "name": "AJAX"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Regex"
            },
            {
              "name": "XML"
            },
            {
              "name": "SQL"
            },
            {
              "name": "Hadoop"
            },
            {
              "name": "Jira"
            },
            {
              "name": "Jenkins"
            },
            {
              "name": "Ant"
            },
            {
              "name": "SVN"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "SQR"
            },
            {
              "name": "C"
            },
            {
              "name": "C++"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "Linux"
            },
            {
              "name": "Solaris"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "34d28ffe-c457-4251-8c8b-1f438021d576",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "C"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "XML"
            },
            {
              "name": "NodeJS"
            },
            {
              "name": "SQL"
            },
            {
              "name": ".NET"
            },
            {
              "name": "MongoDB"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "Cartella"
            },
            {
              "name": "Datameer"
            },
            {
              "name": "Pentaho"
            },
            {
              "name": "Sublime"
            },
            {
              "name": "Visual Studio"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "6aca1dd1-ec98-4e35-8b94-86633f83aa4e",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "ORACLE"
            },
            {
              "name": "Hadoop"
            },
            {
              "name": "Google DFP"
            },
            {
              "name": "Java"
            },
            {
              "name": "PERL"
            },
            {
              "name": "Python"
            },
            {
              "name": "Ruby"
            },
            {
              "name": "C#"
            },
            {
              "name": "VB"
            },
            {
              "name": "ASP.NET"
            },
            {
              "name": "C++"
            },
            {
              "name": "BASH"
            },
            {
              "name": "XML"
            },
            {
              "name": "JSON"
            },
            {
              "name": "SOA"
            },
            {
              "name": "REST"
            },
            {
              "name": "Thrift"
            },
            {
              "name": "NodeJS"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "SOLR"
            },
            {
              "name": "ElasticSearch"
            },
            {
              "name": "MongoDB"
            },
            {
              "name": "MemCache"
            },
            {
              "name": "MS Access"
            },
            {
              "name": "MS FoxPro"
            },
            {
              "name": "PostGreSQL"
            },
            {
              "name": "DBM"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "6ef9e440-4936-4a77-a320-4b7e7a438db1",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "HP"
            },
            {
              "name": "Storyline"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Autonomy IDOL"
            },
            {
              "name": "Java"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "Grails"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "SQL"
            },
            {
              "name": "HTML"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "C++"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "PERL"
            },
            {
              "name": "AWS"
            },
            {
              "name": "CloudFront"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "WebLogic"
            },
            {
              "name": "DBM"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MS Access"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "UNIX"
            },
            {
              "name": "Solaris"
            },
            {
              "name": "AIX"
            },
            {
              "name": "Linux"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "Rational Rose"
            },
            {
              "name": "JUnit"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "Quark"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "c38ee50c-4976-4453-9324-53d1898ca2c9",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Vignette"
            },
            {
              "name": "VB"
            },
            {
              "name": "SQL"
            },
            {
              "name": "XML"
            },
            {
              "name": "XPath"
            },
            {
              "name": "HTML"
            },
            {
              "name": "Java"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "C"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "Linux"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "db94c93f-ed3a-443a-b37a-09947a3ce2f5",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "XML"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XPath"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "CSS"
            },
            {
              "name": "HTML"
            },
            {
              "name": "Velocity"
            },
            {
              "name": "JSP"
            },
            {
              "name": "ContentMARK"
            },
            {
              "name": "Struts"
            },
            {
              "name": "Polopoly"
            },
            {
              "name": "Elastic Path eCommerce"
            },
            {
              "name": "RSuite"
            },
            {
              "name": "Spring"
            },
            {
              "name": "Hibernate"
            },
            {
              "name": "Apache Tomcat"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "BEA Weblogic"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "f2416ec4-27d2-4282-a7f8-ed85c732f4e4",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Vignette"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "Java"
            },
            {
              "name": "JAX-WS"
            },
            {
              "name": "SQL"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "XML"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "SVN"
            },
            {
              "name": "CVS"
            },
            {
              "name": "Harvest"
            },
            {
              "name": "Agile SCRUM"
            },
            {
              "name": "Object Oriented"
            },
            {
              "name": "Waterfall"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "Spring"
            },
            {
              "name": "Struts"
            },
            {
              "name": "Logback"
            },
            {
              "name": "Log4j"
            },
            {
              "name": "JUnit"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "35570418-05ce-4b19-9b05-3bfceb0935f5",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MarkLogic"
            },
            {
              "name": "V8"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Java"
            },
            {
              "name": "Servlets"
            },
            {
              "name": "EJB"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XPath"
            },
            {
              "name": "HTML"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "ANT"
            },
            {
              "name": "Struts"
            },
            {
              "name": "Hibernate"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "DBM"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "Informix"
            },
            {
              "name": "DB2"
            },
            {
              "name": "MS SQL Server"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "370e4616-9307-4c7a-ad72-08dd50330258",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "Python"
            },
            {
              "name": ".NET"
            },
            {
              "name": "C"
            },
            {
              "name": "C++"
            },
            {
              "name": "Ruby"
            },
            {
              "name": "Lisp/Scheme"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "HTML"
            },
            {
              "name": "PHP"
            },
            {
              "name": "ASP.NET"
            },
            {
              "name": "VB"
            },
            {
              "name": "Actionscript"
            },
            {
              "name": "XML"
            },
            {
              "name": "SQL"
            },
            {
              "name": "PERL"
            },
            {
              "name": "JSTL"
            },
            {
              "name": "AngularJS"
            },
            {
              "name": "NodeJS"
            },
            {
              "name": "Play Framework"
            },
            {
              "name": "Twitter Bootstrap"
            },
            {
              "name": "Spark"
            },
            {
              "name": "Jubatus"
            },
            {
              "name": "Apache Mahout"
            },
            {
              "name": "Google Web Toolkit"
            },
            {
              "name": "Google App Engine"
            },
            {
              "name": "Hibernate"
            },
            {
              "name": "MVC"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "EJB"
            },
            {
              "name": "Weka"
            },
            {
              "name": "Lingpipe"
            },
            {
              "name": "Autonomy IDOL"
            },
            {
              "name": "Lucene"
            },
            {
              "name": "Webspinx Web Crawler"
            },
            {
              "name": "Adobe Photoshop"
            },
            {
              "name": "Adobe Fireworks"
            },
            {
              "name": "Adobe Premiere Pro"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MongoDB"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "6542c54e-ac01-42fd-9bc7-c0dd333047d9",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Business Intelligence"
            },
            {
              "name": "Advanced Analytics"
            },
            {
              "name": "Measurement Development"
            },
            {
              "name": "Information Modeling"
            },
            {
              "name": "Business Process Improvement"
            },
            {
              "name": "Complexity Modeling"
            },
            {
              "name": "Big Data"
            },
            {
              "name": "Strategic Planning"
            },
            {
              "name": "Competitive Strategy"
            },
            {
              "name": "Performance Measurement"
            },
            {
              "name": "Budgeting"
            },
            {
              "name": "Project Management"
            },
            {
              "name": "Portfolio Management"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "b3a872b0-b4a0-46f3-a322-04611b550290",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MS Office"
            },
            {
              "name": "Presenter"
            },
            {
              "name": "Engage"
            },
            {
              "name": "Quizmaker"
            },
            {
              "name": "Adobe Captivate"
            },
            {
              "name": "Vignette"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "d4eba92b-f920-43e8-81b5-9c6476f7ebbb",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Autonomy IDOL"
            },
            {
              "name": "DIH"
            },
            {
              "name": "DAH"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Java"
            },
            {
              "name": "XML"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "ASP.NET"
            },
            {
              "name": "HTML"
            },
            {
              "name": "Load Balancing"
            },
            {
              "name": "ElasticSearch"
            },
            {
              "name": "Kibana"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "dee65970-6553-4396-bc5f-d2ec733957d5",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "Python"
            },
            {
              "name": "Pig"
            },
            {
              "name": "Hive"
            },
            {
              "name": "Oozie"
            },
            {
              "name": "HBase"
            },
            {
              "name": "Object Oriented"
            },
            {
              "name": "Falcon"
            },
            {
              "name": "Ambari"
            },
            {
              "name": "HDFS"
            },
            {
              "name": "Storm"
            },
            {
              "name": "Ranger"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "Cross-Browser Issues"
            },
            {
              "name": "Adobe Photoshop"
            },
            {
              "name": "Grails"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "Ingeniux"
            },
            {
              "name": "WordPress"
            },
            {
              "name": "Mercurial"
            },
            {
              "name": "SVN"
            },
            {
              "name": "Git"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "Apache Web Server"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Rightscale"
            },
            {
              "name": "Ruby"
            },
            {
              "name": "JSP"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "PHP"
            },
            {
              "name": "SQL"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "06f9d327-5ee9-41d9-b255-1699cf7a960f",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "XML"
            },
            {
              "name": "SGML"
            },
            {
              "name": "XSD"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "XSL-FO"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "DOM"
            },
            {
              "name": "SAX"
            },
            {
              "name": "Omnimark"
            },
            {
              "name": "requirements gathering"
            },
            {
              "name": "project management"
            },
            {
              "name": "database design"
            },
            {
              "name": "C#"
            },
            {
              "name": "Java"
            },
            {
              "name": ".NET"
            },
            {
              "name": "PHP"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "WordPress"
            },
            {
              "name": "DotNetNuke"
            },
            {
              "name": "RSuite"
            },
            {
              "name": "MarkLogic"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "1e421ee7-90c8-4779-b56e-4977c0a1295a",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Site Analysis"
            },
            {
              "name": "Responsive Design"
            },
            {
              "name": "Axure"
            },
            {
              "name": "User Stories"
            },
            {
              "name": "Mockups"
            },
            {
              "name": "Visual Design"
            },
            {
              "name": "UI Prototyping"
            },
            {
              "name": "UI Design"
            },
            {
              "name": "UX Design"
            },
            {
              "name": "508 Compliance"
            },
            {
              "name": "Usability Testing"
            },
            {
              "name": "Information Architecture"
            },
            {
              "name": "Branding"
            },
            {
              "name": "Google Analytics"
            },
            {
              "name": "Twitter Bootstrap"
            },
            {
              "name": "JavaScript"
            },
            {
              "name": "jQuery"
            },
            {
              "name": "Node.js"
            },
            {
              "name": "Ajax"
            },
            {
              "name": "HTML5"
            },
            {
              "name": "CSS3"
            },
            {
              "name": "Photoshop"
            },
            {
              "name": "Illustrator"
            },
            {
              "name": "Balsamiq"
            },
            {
              "name": "Razor"
            },
            {
              "name": "LESS"
            },
            {
              "name": "Jade"
            },
            {
              "name": "GitHub"
            },
            {
              "name": "SVN"
            },
            {
              "name": "OAuth"
            },
            {
              "name": "Authentication"
            },
            {
              "name": "Login Systems"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "xQuery"
            },
            {
              "name": "XPATH"
            },
            {
              "name": "XSD"
            },
            {
              "name": "DTD"
            },
            {
              "name": "PERL"
            },
            {
              "name": "MVC"
            },
            {
              "name": "REST"
            },
            {
              "name": "SQL"
            },
            {
              "name": "Shell Scripting"
            },
            {
              "name": "ImageMagick"
            },
            {
              "name": "CGI"
            },
            {
              "name": "POSIX"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "JIRA"
            },
            {
              "name": "Ingeniux"
            },
            {
              "name": "Apache"
            },
            {
              "name": "MathML"
            },
            {
              "name": "Kibana"
            },
            {
              "name": "ElasticSearch"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "208c05b7-efd3-429d-91ea-52c1d75e8a7f",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Hadoop"
            },
            {
              "name": "MapReduce"
            },
            {
              "name": "Hive"
            },
            {
              "name": "Pig"
            },
            {
              "name": "Storm"
            },
            {
              "name": "Oozie"
            },
            {
              "name": "Java"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "Visual Studio"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "PHP"
            },
            {
              "name": "SQL"
            },
            {
              "name": "R"
            },
            {
              "name": "C#"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "HBase"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "21053b5a-4b88-427d-8bda-135988ce51f7",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MarkLogic"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Apache Web Server"
            },
            {
              "name": "Apache Tomcat"
            },
            {
              "name": "Git"
            },
            {
              "name": "SVN"
            },
            {
              "name": "Maven"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "Java"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "MATLAB"
            },
            {
              "name": "XPath"
            },
            {
              "name": "HTML"
            },
            {
              "name": "PHP"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "Python"
            },
            {
              "name": "SQL"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MS SQL Server"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "21f03389-79ef-42b6-8ade-311afe2f2f9b",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "ORACLE"
            },
            {
              "name": "SOA"
            },
            {
              "name": "OAM"
            },
            {
              "name": "TFS"
            },
            {
              "name": "BizTalk"
            },
            {
              "name": "MS Office"
            },
            {
              "name": "Operations Manager"
            },
            {
              "name": "SharePoint"
            },
            {
              "name": "Active Directory"
            },
            {
              "name": "IIS"
            },
            {
              "name": "CRM"
            },
            {
              "name": "Dynamics GP"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Right Scale"
            },
            {
              "name": "Rally"
            },
            {
              "name": "WordPress"
            },
            {
              "name": "Salesforce"
            },
            {
              "name": "StarTeam"
            },
            {
              "name": "VMWare"
            },
            {
              "name": "Mercurial"
            },
            {
              "name": "GIT"
            },
            {
              "name": "Paysimple"
            },
            {
              "name": "Rainbow"
            },
            {
              "name": "F5 BigIP"
            },
            {
              "name": "Cisco Access Server"
            },
            {
              "name": "Router"
            },
            {
              "name": "Switch"
            },
            {
              "name": "Firewall"
            },
            {
              "name": "Call Manager"
            },
            {
              "name": "HAProxy"
            },
            {
              "name": "Apache"
            },
            {
              "name": "Lucene"
            },
            {
              "name": "SOLR"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "Open TV"
            },
            {
              "name": "CENTOS"
            },
            {
              "name": "Linux"
            },
            {
              "name": "Ingeniux"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "Mac OSX"
            },
            {
              "name": "Adobe Photoshop"
            },
            {
              "name": "Illustrator"
            },
            {
              "name": "Flash"
            },
            {
              "name": "Liferay"
            },
            {
              "name": "MongoDB"
            },
            {
              "name": "Couchbase"
            },
            {
              "name": "Mule"
            },
            {
              "name": "ServiceMix"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "WebLogic"
            },
            {
              "name": "Microsoft ASP"
            },
            {
              "name": "C#"
            },
            {
              "name": "VB"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "Grails"
            },
            {
              "name": "Java"
            },
            {
              "name": "PHP"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XPath"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "SQL"
            },
            {
              "name": "Actionscript"
            },
            {
              "name": "Chef/Puppet"
            },
            {
              "name": "Visual Studio"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "Solr"
            },
            {
              "name": "Agile SCRUM"
            },
            {
              "name": "Waterfall"
            },
            {
              "name": "Kibana"
            },
            {
              "name": "ElasticSearch"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "23ceaebe-0562-4a15-9bd9-21812d8b20e9",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "C"
            },
            {
              "name": "MATLAB"
            },
            {
              "name": "Velocity"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "Android"
            },
            {
              "name": "Spring"
            },
            {
              "name": "Struts"
            },
            {
              "name": "Lucene"
            },
            {
              "name": "SOLR"
            },
            {
              "name": "Mockito"
            },
            {
              "name": "Liferay"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Linux"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "Maven"
            },
            {
              "name": "Git"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "Jasper Reports"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "54747e3e-c2ae-42a0-9a3b-1cd6424d2b25",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "J2EE"
            },
            {
              "name": "JSF"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Java"
            },
            {
              "name": "EJB"
            },
            {
              "name": "Hibernate"
            },
            {
              "name": "JDBC"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "PERL"
            },
            {
              "name": "Shell Scripts"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "GWT"
            },
            {
              "name": "PHP"
            },
            {
              "name": "DHTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "ANT"
            },
            {
              "name": "Apache Tomcat"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "Informix"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "DB2"
            },
            {
              "name": "UNIX"
            },
            {
              "name": "Linux"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "Rally"
            },
            {
              "name": "Jira"
            },
            {
              "name": "MS Project"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "5ebcac4c-a95d-4708-9a9a-7f4f63b997ac",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Vignette"
            },
            {
              "name": "SharePoint"
            },
            {
              "name": "Java"
            },
            {
              "name": ".NET"
            },
            {
              "name": "Razor"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "C++"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "Dreamweaver"
            },
            {
              "name": "Flash"
            },
            {
              "name": "Fireworks"
            },
            {
              "name": "SVN"
            },
            {
              "name": "CVS"
            },
            {
              "name": "Perforce"
            },
            {
              "name": "Agile SCRUM"
            },
            {
              "name": "Object Oriented Analysis"
            },
            {
              "name": "Object Oriented"
            },
            {
              "name": "Data Modeling"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "76e88621-e821-48f3-b101-0f9d9d958e07",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Hadoop"
            },
            {
              "name": "Lucene"
            },
            {
              "name": "VMWare"
            },
            {
              "name": "OpenStack"
            },
            {
              "name": "Fortran"
            },
            {
              "name": "C"
            },
            {
              "name": "C++"
            },
            {
              "name": "Java"
            },
            {
              "name": "Python"
            },
            {
              "name": "SQL"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "PostGreSQL"
            },
            {
              "name": "MongoDB"
            },
            {
              "name": "HBase"
            },
            {
              "name": "Accumulo"
            },
            {
              "name": "Neo4J"
            },
            {
              "name": "ElasticSearch"
            },
            {
              "name": "Kibana"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "792fa7c2-3d83-43b7-813f-8c23ee8a038b",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MarkLogic"
            },
            {
              "name": "IDOL"
            },
            {
              "name": "DIH"
            },
            {
              "name": "DAH"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "FileSystem"
            },
            {
              "name": "Custom)"
            },
            {
              "name": "Ultraseek"
            },
            {
              "name": "BEA Weblogic"
            },
            {
              "name": "J2EE"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "C++"
            },
            {
              "name": "Shell Scripts"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "83be5442-c3e9-417e-921a-cb27bbbde425",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Ingeniux"
            },
            {
              "name": "Cartella"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Storyline"
            },
            {
              "name": "AngularJS"
            },
            {
              "name": "Rally"
            },
            {
              "name": "Agile SCRUM"
            },
            {
              "name": "Waterfall"
            },
            {
              "name": "MarkLogic"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "afa0bf54-3a4f-4ff0-8ac9-94f2c01b0601",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MS Office"
            },
            {
              "name": "Presenter"
            },
            {
              "name": "Engage"
            },
            {
              "name": "Quizmaker"
            },
            {
              "name": "Adobe Captivate"
            },
            {
              "name": "Vignette"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "fe41526c-6082-4c66-918e-a88f9837f7bd",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "J2EE"
            },
            {
              "name": "C"
            },
            {
              "name": "C++"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "PERL"
            },
            {
              "name": "Shell Scripts"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "JSF"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Java"
            },
            {
              "name": "Velocity"
            },
            {
              "name": "JDBC"
            },
            {
              "name": "EJB"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "XPath"
            },
            {
              "name": "ASP.NET"
            },
            {
              "name": "PHP"
            },
            {
              "name": "DHTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "Lucene"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "Sybase"
            },
            {
              "name": "MS Access"
            },
            {
              "name": "DB2"
            },
            {
              "name": "UNIX"
            },
            {
              "name": "Linux"
            },
            {
              "name": "Solaris"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "JBoss"
            },
            {
              "name": "Apache Tomcat"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Liferay"
            },
            {
              "name": "Ingeniux"
            },
            {
              "name": "WordPress"
            },
            {
              "name": "DotNetNuke"
            },
            {
              "name": "E-Commerce"
            },
            {
              "name": "ElasticPath"
            },
            {
              "name": "Kibana"
            },
            {
              "name": "ElasticSearch"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "28301e9d-995b-4cdc-9a2a-e3126f8247ca",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Hadoop"
            },
            {
              "name": "MapReduce"
            },
            {
              "name": "Hive"
            },
            {
              "name": "Pig"
            },
            {
              "name": "Oozie"
            },
            {
              "name": "HBase"
            },
            {
              "name": "Hortonworks"
            },
            {
              "name": "Microsoft Windows"
            },
            {
              "name": "BASH"
            },
            {
              "name": "C#"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "Git"
            },
            {
              "name": "Haskell"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "Java"
            },
            {
              "name": "Maven"
            },
            {
              "name": "R"
            },
            {
              "name": "SQL"
            },
            {
              "name": "SVN"
            },
            {
              "name": "UNIX"
            },
            {
              "name": "Visual Studio"
            },
            {
              "name": "XPath"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MS SQL Server"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "2d80be8b-51a7-4f67-b14a-fe31d48fbabc",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Data Modeling"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "indexing"
            },
            {
              "name": "stored procedures"
            },
            {
              "name": "PERL"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "Java"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "SVN"
            },
            {
              "name": "XML"
            },
            {
              "name": "transformation"
            },
            {
              "name": "database design"
            },
            {
              "name": "Agile SCRUM"
            },
            {
              "name": "Kibana"
            },
            {
              "name": "ElasticSearch"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "2fe4832e-87f0-422d-9b79-2226fda3cc01",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "Grails"
            },
            {
              "name": "C#"
            },
            {
              "name": "VBScript"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "XML"
            },
            {
              "name": "SQL"
            },
            {
              "name": "SPARQL"
            },
            {
              "name": "Accumulo"
            },
            {
              "name": "PostGreSQL"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "NetBeans"
            },
            {
              "name": "SVN"
            },
            {
              "name": "CVS"
            },
            {
              "name": "Maven"
            },
            {
              "name": "Jenkins"
            },
            {
              "name": "Confluence"
            },
            {
              "name": "JIRA"
            },
            {
              "name": "UML"
            },
            {
              "name": "ElasticSearch"
            },
            {
              "name": "Rabbit MQ"
            },
            {
              "name": "Apache Lucene"
            },
            {
              "name": "Linux"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "5032abdd-2179-42c3-9014-7ab05d982302",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Java"
            },
            {
              "name": "C"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "J2EE"
            },
            {
              "name": "XML"
            },
            {
              "name": "NodeJS"
            },
            {
              "name": "SQL"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MySQL"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "577f15f2-4fa5-4afa-8155-171025c50134",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Hadoop"
            },
            {
              "name": "Apache Hive"
            },
            {
              "name": "HBase"
            },
            {
              "name": "Object Oriented"
            },
            {
              "name": "Cascading"
            },
            {
              "name": "Storm"
            },
            {
              "name": "Kafka"
            },
            {
              "name": "Flume"
            },
            {
              "name": "Mahout"
            },
            {
              "name": "Hortonworks"
            },
            {
              "name": "Cloudera"
            },
            {
              "name": "SQL"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "MongoDB"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "VB"
            },
            {
              "name": "Java"
            },
            {
              "name": "Groovy"
            },
            {
              "name": "EJB"
            },
            {
              "name": "JAX-WS"
            },
            {
              "name": "JAXB"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "XML"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "Grails"
            },
            {
              "name": "Spring"
            },
            {
              "name": "Struts"
            },
            {
              "name": "Logback"
            },
            {
              "name": "Slf4j"
            },
            {
              "name": "Log4j"
            },
            {
              "name": "JUnit"
            },
            {
              "name": "Autonomy IDOL"
            },
            {
              "name": "Solr"
            },
            {
              "name": "Object Oriented Analysis"
            },
            {
              "name": "Agile SCRUM"
            },
            {
              "name": "Waterfall"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "78f4e3a9-fa67-4439-855d-6301c14c724d",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Tomcat"
            },
            {
              "name": "Java"
            },
            {
              "name": "JSF"
            },
            {
              "name": "Spring"
            },
            {
              "name": "MVC"
            },
            {
              "name": "Flex"
            },
            {
              "name": "Hibernate"
            },
            {
              "name": "SVN"
            },
            {
              "name": "Maven"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "DB2"
            },
            {
              "name": "MySQL"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "7a432bd4-c4ee-43f8-b9f4-78b108355705",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "Hadoop"
            },
            {
              "name": "Kibana"
            },
            {
              "name": "ElasticSearch"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Java"
            },
            {
              "name": "Python"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "UNIX"
            },
            {
              "name": "XPath"
            },
            {
              "name": "HTML"
            },
            {
              "name": "CSS"
            },
            {
              "name": "JQuery"
            },
            {
              "name": "XML"
            },
            {
              "name": "MySQL"
            },
            {
              "name": "PostGreSQL"
            },
            {
              "name": "MongoDB"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "SQL"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "7a82820f-e736-4d4c-95ae-ec9ee104ae7f",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "IDOL"
            },
            {
              "name": "Retina"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Dynamic Portal Module"
            },
            {
              "name": "Dynamic Site Module"
            },
            {
              "name": "Java"
            },
            {
              "name": "J2EE"
            },
            {
              "name": "C"
            },
            {
              "name": "C++"
            },
            {
              "name": "SQL"
            },
            {
              "name": "PL/SQL"
            },
            {
              "name": "RMI"
            },
            {
              "name": "JDBC"
            },
            {
              "name": "EJB"
            },
            {
              "name": "Servlets"
            },
            {
              "name": "JSP"
            },
            {
              "name": "Hibernate"
            },
            {
              "name": "WebLogic"
            },
            {
              "name": "Apache"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "DBM"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "MS Access"
            },
            {
              "name": "Sybase"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "Rational Rose"
            },
            {
              "name": "Object Oriented"
            },
            {
              "name": "DHTML"
            },
            {
              "name": "XML"
            },
            {
              "name": "XSLT"
            },
            {
              "name": "AJAX"
            },
            {
              "name": "Eclipse"
            },
            {
              "name": "IntelliJ IDEA"
            },
            {
              "name": "NetBeans"
            },
            {
              "name": "Visual Studio"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "9a553b14-e681-448e-a91d-471d5f57fcdc",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "MS Office"
            },
            {
              "name": "Presenter"
            },
            {
              "name": "Engage"
            },
            {
              "name": "Quizmaker"
            },
            {
              "name": "Storyline"
            },
            {
              "name": "Adobe Captivate"
            },
            {
              "name": "Vignette"
            },
            {
              "name": "Dreamweaver"
            },
            {
              "name": "Fireworks"
            },
            {
              "name": "Flash"
            },
            {
              "name": "HTML"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "cf5aa4e8-0094-4714-aee8-d56ee7285694",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "VCM v7/v8"
            },
            {
              "name": "DPM"
            },
            {
              "name": "VCBS"
            },
            {
              "name": "Informatica"
            },
            {
              "name": "Autonomy IDOL"
            },
            {
              "name": "Omniture"
            },
            {
              "name": "V7.1.1"
            },
            {
              "name": "DB2"
            },
            {
              "name": "TSO/ISPF"
            },
            {
              "name": "Endeavor"
            },
            {
              "name": "Rational Rose"
            },
            {
              "name": "Clear Case"
            },
            {
              "name": "Clear Quest"
            },
            {
              "name": "Requisite Pro"
            },
            {
              "name": "Rational Soda"
            },
            {
              "name": "Rational Software"
            },
            {
              "name": "Modeler"
            },
            {
              "name": "Erwin"
            },
            {
              "name": "Visio"
            },
            {
              "name": "Winrunner"
            },
            {
              "name": "UML"
            },
            {
              "name": "Remedy"
            },
            {
              "name": "MarkLogic"
            },
            {
              "name": "ORACLE"
            },
            {
              "name": "MS SQL Server"
            },
            {
              "name": "SYBASE IQ"
            },
            {
              "name": "COBOL"
            },
            {
              "name": "Java"
            },
            {
              "name": "SERVLETS 2.1"
            },
            {
              "name": "RMI"
            },
            {
              "name": "HTML"
            },
            {
              "name": "XML"
            },
            {
              "name": "MVS/ESA"
            },
            {
              "name": "DOS"
            },
            {
              "name": "Microsoft Windows"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "e6bed4bd-01d0-4777-a3e4-8a4204a81136",
        "_score": 1,
        "_source": {
          "skills": [
            {
              "name": "AngularJS"
            },
            {
              "name": "Grunt"
            },
            {
              "name": "Yeoman"
            },
            {
              "name": "Bower"
            },
            {
              "name": "Jasmine"
            },
            {
              "name": "Karma"
            },
            {
              "name": "Protractor"
            },
            {
              "name": "jQuery"
            },
            {
              "name": "jQuery UI"
            },
            {
              "name": "HTML 5"
            },
            {
              "name": "CSS 3"
            },
            {
              "name": "Sass,Less"
            },
            {
              "name": "Less"
            },
            {
              "name": "Responsive Design"
            },
            {
              "name": "Mobile Design"
            },
            {
              "name": "Bootstrap"
            },
            {
              "name": "Modernizr"
            },
            {
              "name": "Cross-Browser Issues"
            },
            {
              "name": "Adobe Photoshop"
            },
            {
              "name": "JavaScript"
            },
            {
              "name": "Node.js"
            },
            {
              "name": "Java"
            },
            {
              "name": "JSP"
            },
            {
              "name": "XQuery"
            },
            {
              "name": "PHP"
            },
            {
              "name": "SQL"
            },
            {
              "name": "Velocity"
            },
            {
              "name": "Liferay"
            },
            {
              "name": "OpenText VCM"
            },
            {
              "name": "WordPress"
            },
            {
              "name": "Apache Web Server"
            },
            {
              "name": "Tomcat"
            },
            {
              "name": "AWS"
            },
            {
              "name": "Bash"
            },
            {
              "name": "Kibana"
            },
            {
              "name": "ElasticSearch"
            }
          ]
        }
      },
      {
        "_index": "resumes",
        "_type": "resume",
        "_id": "f01a576e-4f57-4d66-83e0-4f8ecdb9f2d8",
        "_score": 1,
        "_source": {
          "skills": []
        }
      }
    ];

/* GET home page. */
router.get('/build', function(req, res, next) {

  function addDocument(myObj, myId){
    var reqURL = 'http://localhost:9200/kibanaresumes/' + myId;
      request({
        url: reqURL,
        method: "POST",
        json: myObj
      }, function(error, response, body) {
        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
          console.log( body );
        } else {
          console.log("HTTP ERROR:");
          console.log(error);
          if (response.hasOwnProperty("statusCode")){
            console.log("HTTP BODY:");
            console.log(body);
            console.log("Status Code: " + response.statusCode);
            res.sendStatus(response.statusCode);
          } else {
            res.sendStatus(500);
          }
        }
      });
  }

  _.forEach(skills, function(n){
        addDocument(n._source, n._id);
  });

    res.render('index', { title: 'Resume Wrangler Kibana Index Builder' });

});

module.exports = router;
