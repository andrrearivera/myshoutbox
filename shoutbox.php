<?php include 'database.php';

function populate_shoutbox($conn) {
    $query = "SELECT * FROM shouts ORDER BY id DESC LIMIT 20";
    $shouts = mysqli_query($conn, $query);
    while($row = mysqli_fetch_assoc($shouts)) {
      echo '<li>';
      echo $row['name'] . ': '; // put a colon and a space after name text
      echo $row['shout'];
      echo ' [ ' . $row['date'] . ' ]'; // put brackets around date text
      echo '</li>';
    }
}

if (isset($_POST['name']) && isset($_POST['shout'])) {
  $name = mysqli_real_escape_string($conn, $_POST['name']);
  $shout = mysqli_real_escape_string($conn, $_POST['shout']);

  date_default_timezone_set('America/New_York');
  $date = date('h:i:s a m-d-Y ', time());

  $query = "INSERT INTO shouts (name, shout, date) VALUES ('$name', '$shout', '$date')";
  $result = mysqli_query($conn, $query);

  if ($result) {
    populate_shoutbox($conn);
    } else {
    echo "Error: Unable to write to the database.";
    }
} elseif (isset($_POST['refresher'])) {
  populate_shoutbox($conn);
} else {
echo "Error: Unable to submit your shout.";
}
?>
