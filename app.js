const args = process.argv.slice(2);
const fs = require('fs');

function getCurrentDateTime() {
    const now = new Date();

    // Day
    const day = now.getDate();

    // Month names
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()];

    // Year
    const year = now.getFullYear();

    // Hours
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");

    // AM / PM
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12

    return `${day} ${month} ${year} ${hours}:${minutes} ${ampm}`;
}
if (!args[0]) {
    console.log("Comand not found"); process.exit(0);
}
else if (args[0] == "add") {

    task = args[1];

    add(task);

}
else if (args[0] == "update") {
    let id = parseInt(args[1]);
    let task = args[2];
    update(id, task);
}

else if (args[0] == "delete") {

    deleteTask(parseInt(args[1]));
}
else if (args[0] == "list") {
    if (args[1] == "done") {
        showDoneList();
    }
    else if (args[1] == "todo") {
        showtodoList();
    }
    else if (args[1] == "in-progress") {
        showINprogessList();
    }
    else {
        console.log("Tasks List:\n");
        showList();
    }

}
else if (args[0].includes("mark")) {
    let idx = args[0].indexOf("-");
    let status = args[0].slice(idx + 1);

    id = args[1];

    mark(status, id);

}

else {
    console.log("Comand not found")

}

function mark(status, id) {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {
                if (result.trim() === "") {
                    console.log("No task to mark..."); process.exit(0);

                }
                let data = JSON.parse(result);


                const task_to_be_updated = data[id - 1];
                task_to_be_updated.status = status;
                // data.push(newtask);

                fs.writeFile('task.json', JSON.stringify(data), (error) => {
                    if (error) {
                        console.log(error);

                    }
                    else {
                        console.log(`Task Marked ${status} successfully (ID: ${id})`);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    })
}

function showINprogessList() {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {

                let data = JSON.parse(result);

                for (let index = 0; index < data.length; index++) {
                    if (data[index].status == "in-progress") {
                        console.log(data[index].task);
                    }
                    else {
                        continue;
                    }

                }


            } catch (error) {
                console.log(error);
            }
        }
    })
}
function showtodoList() {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {

                let data = JSON.parse(result);

                for (let index = 0; index < data.length; index++) {
                    if (data[index].status == "todo") {
                        console.log(data[index].task);
                    }
                    else {
                        continue;
                    }

                }


            } catch (error) {
                console.log(error);
            }
        }
    })
}
function showDoneList() {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {

                let data = JSON.parse(result);

                for (let index = 0; index < data.length; index++) {
                    if (data[index].status == "done") {
                        console.log(data[index].task);
                    }
                    else {
                        continue;
                    }

                }


            } catch (error) {
                console.log(error);
            }
        }
    })
}
function showList() {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {

                let data = JSON.parse(result);

                for (let index = 0; index < data.length; index++) {
                    console.log(data[index].task);

                }


            } catch (error) {
                console.log(error);
            }
        }
    })
}

function deleteTask(id) {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {

                let data = JSON.parse(result);
                if (result.trim() === "" || data.length == 0) {
                    console.log("No task to delete..."); process.exit(0);

                }


                data.splice(id - 1, 1);
                for (let index = 0; index < data.length; index++) {
                    data[index].id = index + 1;

                }

                fs.writeFile('task.json', JSON.stringify(data), (error) => {
                    if (error) {
                        console.log(error);

                    }
                    else {
                        console.log(`Task Deleted successfully (ID: ${id})`);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    })
}

function update(id, newtask) {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {

                let data = JSON.parse(result);
                let time = getCurrentDateTime();
                if (result.trim() === "" || data.length < id || data.length <= 0) {
                    console.log("No task to update..."); process.exit(0);

                }


                const task_to_be_updated = data[id - 1];
                task_to_be_updated.task = newtask;
                task_to_be_updated.updatedAt = time;
                // data.push(newtask);

                fs.writeFile('task.json', JSON.stringify(data), (error) => {
                    if (error) {
                        console.log(error);

                    }
                    else {
                        console.log(`Task Updated successfully (ID: ${id})`);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    })
}

function add(task) {
    fs.readFile('task.json', 'utf8', (error, result) => {
        if (error) {
            console.log(error);

        }
        else {
            try {
                let data = result.trim() === "" ? [] : JSON.parse(result);
                let id = data.length + 1;
                let time = getCurrentDateTime();

                const newtask = {
                    "task": `${task}`,
                    "id": `${id}`,
                    "status": `todo`,
                    "createdAt": `${time}`,
                    "updatedAt": `${time}`
                }
                data.push(newtask);

                fs.writeFile('task.json', JSON.stringify(data), (error) => {
                    if (error) {
                        console.log(error);

                    }
                    else {
                        console.log(`Task added successfully (ID: ${id})`);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
    })
}