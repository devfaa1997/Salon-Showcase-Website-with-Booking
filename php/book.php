<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

$salonEmail = 'meganessig1@gmail.com';
$salonName = 'Hair by Megan Essig';

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    $input = $_POST;
}

$fullName = sanitize($input['fullName'] ?? '');
$email = sanitize($input['email'] ?? '');
$phone = sanitize($input['phone'] ?? '');
$service = sanitize($input['service'] ?? '');
$preferredDate = sanitize($input['preferredDate'] ?? '');
$preferredTime = sanitize($input['preferredTime'] ?? '');
$firstVisit = sanitize($input['firstVisit'] ?? '');
$hairHistory = sanitize($input['hairHistory'] ?? '');
$inspiration = sanitize($input['inspiration'] ?? '');
$paymentMethod = sanitize($input['paymentMethod'] ?? 'venmo');

if (empty($fullName) || empty($email) || empty($phone) || empty($service) || empty($preferredDate) || empty($preferredTime)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please enter a valid email address']);
    exit;
}

$serviceNames = [
    'custom-blonde' => 'Custom Blonde',
    'balayage' => 'Balayage',
    'full-color' => 'Full Color',
    'root-touchup' => 'Root Touch-Up',
    'extensions-consultation' => 'Hair Extensions Consultation',
    'extension-installation' => 'Extension Installation',
    'haircut-style' => 'Haircut & Style',
    'special-event' => 'Special Event Styling',
    'brazilian-blowout' => 'Brazilian Blowout',
    'blowout' => 'Blowout'
];

$paymentNames = [
    'venmo' => 'Venmo',
    'zelle' => 'Zelle',
    'paypal' => 'PayPal',
    'cashapp' => 'Cash App'
];

$serviceDisplay = $serviceNames[$service] ?? $service;
$paymentDisplay = $paymentNames[$paymentMethod] ?? $paymentMethod;
$visitText = $firstVisit === 'yes' ? 'Yes - First time client' : 'No - Returning client';

$bookingDetails = "
========================================
BOOKING REQUEST - $salonName
========================================

CLIENT INFORMATION
-----------------
Name: $fullName
Email: $email
Phone: $phone

APPOINTMENT DETAILS
-------------------
Service: $serviceDisplay
Preferred Date: $preferredDate
Preferred Time: $preferredTime
First Visit: $visitText

HAIR INFORMATION
----------------
Current Hair Color/History:
$hairHistory

Inspiration/Desired Look:
$inspiration

PAYMENT
-------
Preferred Payment Method: $paymentDisplay

========================================
Submitted: " . date('Y-m-d H:i:s') . "
========================================
";

$clientSubject = "Booking Request Confirmed - $salonName";
$clientMessage = "
Dear $fullName,

Thank you for your booking request! We have received your appointment request and will review it shortly.

YOUR BOOKING DETAILS
--------------------
Service: $serviceDisplay
Preferred Date: $preferredDate
Preferred Time: $preferredTime

We will send you a confirmation email with payment details for your $50 deposit.

If you have any questions, please contact us at $salonEmail or call 407-927-1927.

Thank you for choosing $salonName!

Best regards,
Megan Essig
$salonName
";

$salonSubject = "New Booking Request from $fullName";

$headers = "From: $salonEmail\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$clientHeaders = "From: $salonEmail\r\n";
$clientHeaders .= "MIME-Version: 1.0\r\n";
$clientHeaders .= "Content-Type: text/plain; charset=UTF-8\r\n";

$salonSent = mail($salonEmail, $salonSubject, $bookingDetails, $headers);
$clientSent = mail($email, $clientSubject, $clientMessage, $clientHeaders);

if ($salonSent && $clientSent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your booking request has been received. Check your email for confirmation.'
    ]);
} elseif ($salonSent) {
    echo json_encode([
        'success' => true, 
        'message' => 'Booking received! We will contact you shortly.'
    ]);
} else {
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error processing your request. Please try again or contact us directly.'
    ]);
}

function sanitize($data) {
    if (is_array($data)) {
        return array_map('sanitize', $data);
    }
    return htmlspecialchars(strip_tags(trim($data)), ENT_QUOTES, 'UTF-8');
}
