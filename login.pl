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

my $strsearch = $q->param("search");
my $strdate = "Date";
my $strtime = "Time";
 
my $dbh = DBI->connect(
 "dbi:SQLite:dbname=appointment.db",
 "",
 "",
 { RaiseError => 1 },
) or die $DBI::errstr;

my $params = $q->Vars;
 
# check the username and password in the database
my $statement;

# Start building up the database query

my $sql = "select Date, Time, Desc  from appoint";
my $countsql = "select count(*)  from appoint";

# if a search parameter was supplied in the AJAX call, build the WHERE part in the SQL statement
if( $strsearch ne "" ){
    $sql .= " WHERE ";
    $sql .= "Desc LIKE " . "'%".$strsearch."%'";
	
	$countsql .= " WHERE ";
    $countsql .= "Desc LIKE " . "'%".$strsearch."%'";
}
 
# if a sorting parameter was supplied in the AJAX call, build up the ORDER BY part in the SQL statement

$sql .= ' ORDER BY ' . "'". $strdate . "'";
 

# Limit the output and also allow to paginate or scroll infinitely
# $sql .= " LIMIT ? OFFSET ?";

# Get the total count of rows in the table

my $count = $dbh->selectrow_arrayref($countsql);

# my $mw = new MainWindow;
# $mw -> messageBox(-message=>$count);

my @values;
# push @values, (($params->{iDisplayLength} > 0 ? $params->{iDisplayLength} : 25), ( $params->{iDisplayStart} // 0));

# Fetch the data from the database
my $data = $dbh->selectall_arrayref($sql, { Slice => [] }, @values);

my $json = encode_json({ aaData => $data, iTotalRecords => $count, iTotalDisplayRecords => $count, sEcho => int($params->{sEcho}) });

########################

require "common.pl";

###########
 

# return JSON string
print $q->header(-type => "application/json", -charset => "utf-8");

print $json;