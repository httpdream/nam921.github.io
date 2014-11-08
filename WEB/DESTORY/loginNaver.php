<?php
define( NAVER_OAUTH_AUTHORIZE_URL, "https://nid.naver.com/oauth2.0/authorize" );

class OAuthSampleRequest 
{
    var $client_id;
    var $client_secret;
    var $redirect_url;
    var $state;
    var $session;
    var $authorize_url = NAVER_OAUTH_AUTHORIZE_URL;

    function __construct( $client_id, $client_secret, $redirect_url) {
        $this->client_id = $client_id;
        $this->client_secret = $client_secret;
        $this->redirect_url = $redirect_url;
    } 
    function start_session (){ 
        $this->session = new UserSession();
    }
    function generate_state() {
        $mt = microtime();
    $rand = mt_rand();
    $this->state = md5( $mt . $rand );
    }
    function set_state() {
        $this->generate_state();
        $this->session->set_state($this->state); 
    }
    function get_request_url() {
        return $this->authorize_url . "?response_type=code&client_id=" . $this->client_id . "&state=" . $this->state . "&redirect_url=" . urlencode($redirect_url); 
    }
}

$request = new OAuthSampleRequest( YOUR_CLIENTID, YOUR_CLIENTSECRET, YOUR_REDIRECT_URL );
$request->start_session();
$request->set_state();
$request->get_request_url();
header('Location: '. $request->redirect_url );
?>