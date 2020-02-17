<?PHP
	
	error_reporting(0);
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
 
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
 
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
        exit(0);
    }
	
	include 'config/DBConnAttendance.php';
	include 'class/appServicesAttendance.php';

	$databaseObj = new DB();
	$db = $databaseObj->getConnection();
	$servicesObj = new AppServices($db);
	
	$request = json_decode(file_get_contents("php://input", true));
    $photo_path = "../uploads/photo/";
	
	if(isset($_GET["value"]))
	{
		$page_key = $_GET["value"];
	}
	
	if($page_key == "LoginAuthentication")
	{
		$url = "";
		$servicesObj->emp_id = $request->emp_id;
        $servicesObj->password = $request->password;
		//$servicesObj->imei_no = $request->imei_no;
		$stmt = $servicesObj->loginAuthentication();
		if($stmt) {
			if($stmt->rowCount() > 0){
				$resArray = array();	
				$resArray["data"] = array();
				//$emp_id = $row['emp_id'];
				while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
					extract($row);
					if($row['profile_picture']){
						$url = "http://192.168.43.247:8080/attendance/images/".$row['profile_picture'];
					}
					$arrItem = array(
						"emp_id" => $row['emp_id'],
						"first_name" => $row['first_name'],
						"last_name" => $row['last_name'],
						"profile_picture" => $url,
						"email" => $row['email'],
						"gender" => $row['gender'],
						"dob" => $row['dob'],
						"mobile_no" => $row['mobile_no'],
						"qualification" => $row['qualification'],
						"street_address" => $row['street_address'],
						"city" => $row['city'],
						"state" => $row['state'],
						"country" => $row['country'],
						"pincode" => $row['pincode'],
						"designation" => $row['designation']
					);
					array_push($resArray["data"], $arrItem);
				}
				$resArray["ErrorCode"] = 0;
				$resArray["ErrorMessage"] = "Success";
                echo json_encode($resArray);
			}
            else {
                echo json_encode( array("ErrorCode" => 2, "ErrorMessage" => "Invalid Credientials"));
            }
        }
        else{
            echo json_encode( array("ErrorCode" => 1, "ErrorMessage" => "Failed"));
        }
	}
	
	if($page_key=="UpdateProfile")
    {	
        $servicesObj->type = $request->type;
		$servicesObj->emp_id = $request->emp_id;
		$servicesObj->street_address = $request->street_address;
		$servicesObj->city = $request->city;
		$servicesObj->state = $request->state;
		$servicesObj->country = $request->country;
		$servicesObj->pincode = $request->pincode;	
		$servicesObj->mobile_no = $request->mobile_no;
		if($request->type == 'profile_picture'){
			$servicesObj->profile_picture = uploadImage($request->photo_file, $photo_path);
		}
		$result = $servicesObj-> updateProfile();
		echo json_encode($result);
    }
	
    function uploadImage($file, $target_dir){ 

       $extension = strtolower(getExtension($file));
       $filename = "IMG_".date('YmdHis').".".$extension;
       $target_file = $target_dir . $filename; 
       if (file_exists($target_file))
       {
           $j = 1;
           $new_target_file = $target_file; 
           while (file_exists($new_target_file)) 
           { 
               $new_filename = "IMG_".date('YmdHis')."_".$j.".".$extension;
               $new_target_file = $target_dir . $new_filename; 
               $j++;
           }
           $filename = $new_filename;
           $target_file = $new_target_file;
       }

       $file = str_replace('data:image/'.$extension.';base64,', '', $file);
       $file = str_replace(' ', '+', $file);
       if(file_put_contents($target_file, base64_decode($file))){
           return $filename;
       }
       else{
           return "";
       }
   }
   
    function getExtension($uri) {
        $img = explode(',', $uri);
        $ini =substr($img[0], 11);
        $type = explode(';', $ini);
        return $type[0];
    }
	
	if($page_key == "GetEmployeeDetails")
	{
		$url = "";
		$stmt = $servicesObj->getEmployeeDetails();
		if($stmt) {
			if($stmt->rowCount() > 0){
				$resArray = array();	
				$resArray["data"] = array();
				while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
					extract($row);
					if($row['profile_picture']){
						$url = "http://192.168.43.247:8080/attendance/images/".$row['profile_picture'];
					}
					$arrItem = array(
						"first_name" => $row['first_name'],
						"last_name" => $row['last_name'],
						"profile_picture" => $url,
						"dob" => $row['dob'],
						"mobile_no" => $row['mobile_no'],
						"street_address" => $row['street_address'],
						"city" => $row['city'],
						"state" => $row['state'],
						"country" => $row['country'],
						"pincode" => $row['pincode'],
						"designation" => $row['designation']
					);
					array_push($resArray["data"], $arrItem);
				}
				$resArray["ErrorCode"] = 0;
				$resArray["ErrorMessage"] = "Success";
                echo json_encode($resArray);
			}
            else {
                echo json_encode( array("ErrorCode" => 2, "ErrorMessage" => "Invalid Credientials"));
            }
        }
        else{
            echo json_encode( array("ErrorCode" => 1, "ErrorMessage" => "Failed"));
        }
	}
	
	if($page_key=="GetNotices")
    {
        $url = ""; 
        $stmt = $servicesObj->getNotices();
        if ($stmt) {
            $resArray = array();
            $resArray["data"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $url = "";
                if($row['image']){
                    $url = "http://192.168.43.247:8080/attendance/uploads/notification/".$row['image'];
                }
                $arrItem = array(
                    "notice_id" => $row['notice_id'],
                    "title" => $row['title'],
                    "body" => $row['body'],
                    "image" => $url,
                    "create_date" => date("d-m-Y h:i:s", strtotime($row['create_date'])),
					"is_active" => $row['is_active']
                );
                array_push($resArray["data"], $arrItem);
            }
            $resArray["ErrorCode"] = 0;
            $resArray["ErrorMessage"] = "Success";
            echo json_encode($resArray);
        }
        else{
            echo json_encode( array("ErrorCode" => 1, "ErrorMessage" => "Failed"));
        }
    }
	
	if($page_key=="ViewHolidayList")
    {
        $url = ""; 
		$servicesObj->location = $request->location;
        $servicesObj->year = $request->year;
        $stmt = $servicesObj->viewHolidayList();
        if ($stmt) {
            $resArray = array();
            $resArray["data"] = array();
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                extract($row);
                $url = "";
                if($row['image']){
                    $url = "http://localhost:8080/attendance/uploads/notification/".$row['image'];
                }
                $arrItem = array(
                    "holiday_id" => $row['holiday_id'],
                    "date" => date("d-m-Y", strtotime($row['date'])),
                    "holiday_name" => $row['holiday_name'],
                    "image" => $url,
					"location" => $row['location'],
					"year" => $row['year'],
                    "create_date" => date("d-m-Y h:i:s", strtotime($row['create_date']))
                );
                array_push($resArray["data"], $arrItem);
            }
            $resArray["ErrorCode"] = 0;
            $resArray["ErrorMessage"] = "Success";
            echo json_encode($resArray);
        }
        else{
            echo json_encode( array("ErrorCode" => 1, "ErrorMessage" => "Failed"));
        }
    }
	
	if($page_key == "AddAttendance")
	{
		$servicesObj->emp_id = $request->emp_id;
		$result = $servicesObj->AddAttendance();
		echo json_encode($result);
	}
	
	
	if($page_key == "AddLeaves")
	{
		$servicesObj->emp_id = $request->emp_id;
		$servicesObj->leave_type = $request->leave_type;
		$servicesObj->start_date = $request->start_date;
		$servicesObj->end_date = $request->end_date;
		$servicesObj->in_lieu_date = $request->in_lieu_date;
		$servicesObj->comp_off_date = $request->comp_off_date;
		$servicesObj->reason = $request->reason;
		$servicesObj->leave_desc = $request->leave_desc;
		$result = $servicesObj->addLeaves();
		echo json_encode($result);
	}
	
?>