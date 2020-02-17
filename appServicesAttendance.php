<?PHP
	
	class AppServices
	{
		private $conn;
		
		public $emp_id;
		public $password;
		public $imei_no;
		public $mobile_no;
		public $street_address;
		public $city;
		public $state;
		public $country;
		public $pincode;
		public $location;
		public $year;
		public $type;
		public $leave_type;
		public $start_date;
		public $end_date;
		public $reason;
		public $leave_desc;
		public $in_lieu_date;
		public $comp_off_date;
		
		public function __construct($db) 
		{
        $this->conn = $db;
		}
		
		public function loginAuthentication()
		{
			$query = "SELECT * FROM tbl_employee WHERE emp_id = '$this->emp_id' AND password = '$this->password'" ;
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt;			
		}
		
		public function getEmployeeDetails()
		{
			$query = "SELECT * FROM tbl_employee WHERE emp_id = '1901201002'" ;
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt;			
		}
		
		public function updateProfile()
		{
			if($this->type == 'address'){
				$query = "UPDATE `tbl_employee` SET `street_address` = '$this->street_address', `city` = '$this->city', `state` = '$this->state',`country` = '$this->country', `pincode` = '$this->pincode',`modify_date`= NOW() WHERE `emp_id` = $this->emp_id";
			}
		
			else if($this->type == 'mobile_no'){
				$query = "UPDATE `tbl_employee` SET `mobile_no` = '$this->mobile_no', `modify_date`= NOW() WHERE `emp_id` = '$this->emp_id'";
			}			

			else if($this->type == 'profile_picture'){
				$query = "UPDATE `tbl_employee` SET `photo` = '$this->photo', `modify_date`= NOW() WHERE `emp_id` = '$this->emp_id'";
			}
			//echo $query;
			$stmt = $this->conn->prepare($query);
			if($stmt->execute()){
				if($stmt->rowCount() > 0){
					$resArray = array();
					$resArray["data"] = array();
					$query = "SELECT * FROM `tbl_employee` WHERE `emp_id` = '$this->emp_id'";
					$stmt = $this->conn->prepare($query);
					$stmt->execute();
					while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
						extract($row);
						$url = "";
						if($row['photo']){
							//$url = "http://192.168.0.206:8080/SwasthyaCON_APP/uploads/photo/".$row['photo'];
							$url = "http://localhost:8080/attendance/images/".$row['photo'];
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
							"designation" => $row['designation'],
							"is_active" => $row['is_active'],
							"create_date" => $row['create_date'],
							"modify_date" => $row['modify_date']
							
						);
						array_push($resArray["data"], $arrItem);
					}
					$resArray["ErrorCode"] = 0;
					$resArray["ErrorMessage"] = "Success";
					return $resArray;
				}
				else{
					return array('ErrorCode'=> 1,'ErrorMessage'=> 'Sorry! Employee not found.');
				}
			}
			else{
				return array('ErrorCode'=> 2,'ErrorMessage'=> 'Something went wrong. Try again.');
			}
		}
		
		public function AddAttendance()
		{
			$query = "SELECT * FROM tbl_attendance WHERE emp_id =".$this->emp_id." AND in_time >= CURDATE()";
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			if($stmt->rowCount() > 0){
				$query = "UPDATE `tbl_attendance` SET `out_time`= NOW() WHERE `emp_id` = ".$this->emp_id." AND in_time >= CURDATE()";
                $stmt = $this->conn->prepare($query);
                if($stmt->execute()) {    
                    $result = array('ErrorCode'=> 0,'ErrorMessage'=> 'Success');
                } 
                else {
                    $result = array('ErrorCode'=> 1,'ErrorMessage'=> 'Failed');
                }
			}
			else{
				$query = "INSERT INTO `tbl_attendance`(`emp_id`, `in_time`, `is_active`) VALUES ($this->emp_id, NOW(), 1)";
                $stmt = $this->conn->prepare($query);
                if($stmt->execute()) {    
                    $result = array('ErrorCode'=> 0,'ErrorMessage'=> 'Success');
                } 
                else {
                    $result = array('ErrorCode'=> 1,'ErrorMessage'=> 'Failed');
                }
			}
			return $result;
		}
		
		public function addLeaves()
		{
			$query = "SELECT * FROM tbl_attendance WHERE emp_id =".$this->emp_id." AND in_time >= CURDATE()";
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			if($this->leave_type == 'priviledge_leave')
			{
				$query = "INSERT INTO `tbl_apply_leave`(`leave_type`,`start_date`, `end_date`, `reason`, `leave_desc`, `is_active`) VALUES ('$this->leave_type','$this->start_date', '$this->end_date', '$this->reason', '$this->leave_desc', 1)"; echo $query;
                $stmt = $this->conn->prepare($query);
                if($stmt->execute()) {    
                    $result = array('ErrorCode'=> 0,'ErrorMessage'=> 'Success');
                } 
                else {
                    $result = array('ErrorCode'=> 1,'ErrorMessage'=> 'Failed');
                }
			}
			
			else if($this->leave_type == 'comp_off'){
				$query = "INSERT INTO `tbl_apply_leave`(`leave_type`,`in_lieu_date`, `comp_off_date`, `leave_desc`, `is_active`) VALUES ('$this->leave_type','$this->in_lieu_date', '$this->comp_off_date', '$this->leave_desc', 1)";
                $stmt = $this->conn->prepare($query);
                if($stmt->execute()) {    
                    $result = array('ErrorCode'=> 0,'ErrorMessage'=> 'Success');
                } 
                else {
                    $result = array('ErrorCode'=> 1,'ErrorMessage'=> 'Failed');
                }
			}
			
			else{
				
				echo "Oops, something went wrong...!";
			}
			return $result;
		}
		
		public function getNotices()
		{
			$query = "SELECT * FROM tbl_notices WHERE is_active = 1";
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt;			
		}
		
		public function viewHolidayList()
		{
			$query = "SELECT * FROM `tbl_holiday` WHERE `location` = '$this->location' AND `year` = '$this->year' AND is_active = 1";
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			return $stmt;			
		}
	}
	
?>