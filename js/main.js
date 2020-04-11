database.collection('students').get().then( (data) => {
    var list = document.querySelector('table');
    var result ="";
    var edit = "";
    data.forEach(element => {
        const { name, country, gender, } = element.data();
        result +=`
            <tbody>
                <tr>
                    <td>${name}</td>
                    <td>${element.data().class}</td>
                    <td>${country}</td>
                    <td>${gender}</td>
                    <td>
                    <a onclick="edit('${element.id}')" style="cursor:pointer"><i class="material-icons">edit</i></a>

                    <a onclick="udelete('${element.id}')" style="cursor:pointer"><i class="material-icons">delete</i></a>
                    </td>
                </tr>
            </tbody>

            `;
    });
    list.insertAdjacentHTML("beforeend", result);
});

$("#submit").on('click', function() {
    $name = $("#name").val();
    $class = $("#class").val();
    $gender = $("#gender").val();
    $country = $("#country").val();
    database.collection("students").add({
      name:$name,
      class:$class,
      gender:$gender,
      country:$country,
    })
    $("#class").val("");
    $("#gender").val("");
    $("#country").val("")
    $("#name").val("");
 })

function udelete(userID) {
    database.collection("students").doc(userID).delete();
}

$id =0;
$old_gender ="";
function edit(id){
    $id = id;
    database.collection('students').doc(id).get().then( (data)=>{
        $old_gender = data.data().gender;
        $('#form-edit #name-edit').val(data.data().name)
        $('#form-edit #class-edit').val(data.data().class)
        $('#form-edit #country-edit').val(data.data().country)
    });
    $("#my-modal").modal("show");
}
function updateEdit(){
    $name = $("#name-edit").val();
    $class = $("#class-edit").val();
    $country = $("#country-edit").val();
    $new_gender = $("#gender-edit").val();
    $gender = "";
    if($new_gender != 'Male' && $new_gender != 'Female' ){
        $gender = $old_gender;
    }else {
        $gender = $new_gender;
    }
    database.collection('students').doc($id).update({
      name:$name,  
      class:$class,
      country:$country,
      gender:$gender,
    })
    $("#my-modal").modal("hide");
}