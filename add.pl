#!"C:\perl64\bin\perl.exe"

use strict; 
use warnings;
use DBI;
use JSON;
use CGI;
use utf8;
use JSON::Parse 'parse_json';
use HTML::Make;
use Data::Dumper;
use Tk;
use CGI qw(:standard Vars); 
use CGI::Carp qw(warningsToBrowser fatalsToBrowser); 
 
# read the CGI params

my $q = CGI->new;
my $mw = new MainWindow;

my $strdate = $q->param("'Date'");
my $strtime = $q->param("'Time'");
my $strdesc = $q->param("'Desc'");

my $params = "\"" . $strdate . "\",\"" . $strtime . "\" , \"" . $strdesc . "\"";

my $dbh = DBI->connect(
 "dbi:SQLite:dbname=appointment.db",
 "",
 "",
 { RaiseError => 1 },
) or die $DBI::errstr;

# Start building up the database query

my $sql = "INSERT INTO appoint (Date, Time, Desc) VALUES(" . $params . ");";

# $mw -> messageBox(-message=>$sql);

my $sth = $dbh->prepare( $sql );
$sth->execute();

########################

require "common.pl";

###########



# return JSON string
print $q->header(-type => "application/text", -charset => "utf-8");

# my $json = encode_json({iTotalRecords => $count});
print "success";