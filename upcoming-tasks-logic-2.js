data = Array.from(
    [{taskid: '1', task: 'Task 1', project: 'COMP 3020', duration: '200', breaks: 0, progress: 100, date: '2021-11-26', note:'Lorem ipsum dolor sit amet, consectetuar adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    {taskid: '2', task: 'Task 2', project: 'COMP 3020', duration: '250',breaks: 10, progress: 100, date: '2021-11-29', note:'Integer venenatis orci et massa feugiat vehicula. Integer ullamcorper non libero vel semper. Nam eu tempor purus. Suspendisse potenti. Vivamus eget erat ex. '},
    {taskid: '3', task: 'Task 3', project: 'COMP 3020', duration: '300',breaks: 23, progress: 80, date: '2022-02-25',note:'Cras sit amet ultrices felis, ut faucibus lorem. Integer non dictum leo, at aliquam arcu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'},
    {taskid: '4', task: 'Task 4', project: 'COMP 3040', duration: '245',breaks: 60, progress: 100, date: '2021-11-21', note:'Praesent sagittis venenatis arcu ut semper. Cras finibus lorem tempus, varius lectus ac, tristique lacus. Cras aliquam facilisis felis quis euismod.'},
    {taskid: '5', task: 'Task 5', project: 'COMP 3040', duration: '200',breaks: 25, progress: 90, date: '2022-01-06', note:'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce nec luctus diam. Morbi nec tempus est, vitae aliquet nibh.'},
    {taskid: '6', task: 'Task 6', project: 'COMP 3040', duration: '500',breaks: 41, progress: 100, date: '2021-11-24', note:'Ut blandit in leo in pellentesque. Suspendisse nec enim sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla sem tortor, molestie ornare finibus vitae, viverra sed dui.'},
    {taskid: '7', task: 'Task 7', project: 'COMP 2140', duration: '710',breaks: 75, progress: 50, date: '2022-01-24', note:'Quisque quis vehicula odio. Praesent eu massa eu mauris rhoncus porta. Fusce interdum suscipit purus, vitae euismod sapien blandit sit amet.'},
    {taskid: '8', task: 'Task 8', project: 'COMP 2140', duration: '400',breaks: 100, progress: 75, date: '2022-02-03', note:'Praesent placerat congue nisl, sit amet congue ante pulvinar ut. Nullam dictum, lorem non rutrum euismod, ante dui pharetra nunc, et molestie nunc turpis a massa.'},
    {taskid: '9', task: 'Task 9', project: 'COMP 2140', duration: '300',breaks: 12, progress: 40, date: '2022-01-29', note:'In interdum purus quis urna egestas dignissim. Suspendisse potenti. Maecenas non sapien fringilla, lobortis diam vitae, rhoncus ipsum.'},
    {taskid: '10', task: 'Task 10', project: 'COMP 4710', duration: '400',breaks: 0, progress: 100, date: '2021-11-13', note:'Nam eu nisi laoreet, sodales eros et, posuere orci. Nam vehicula rutrum ligula ac blandit. Curabitur scelerisque ullamcorper mauris, nec rutrum ligula. Ut hendrerit commodo est, ac consequat nisl finibus vel. Vestibulum tincidunt est odio, non tempus odio vulputate eu. Pellentesque id lectus id ex tempor laoreet. Nulla aliquet mauris vitae risus accumsan, eget venenatis magna gravida. Vestibulum consequat pellentesque elit, at dictum arcu viverra tincidunt. Etiam rutrum, mi sed pretium lacinia, lorem elit gravida dolor, sit amet commodo orci turpis in risus. Nunc consectetur magna metus, ullamcorper lobortis lectus consectetur eget. Nullam in mauris sed diam faucibus tempor in non lorem.'},
    {taskid: '11', task: 'Task 11', project: 'COMP 4710', duration: '200',breaks: 0, progress: 60, date: '2022-01-06', note:'Nam sed tincidunt odio. Sed nulla orci, semper ut mattis vel, luctus a eros. Nullam aliquam, massa commodo scelerisque aliquam, odio eros mattis libero, ut malesuada ipsum dolor in risus. Duis sagittis ipsum sem, finibus laoreet magna dapibus scelerisque. Sed a ipsum nec lectus congue tincidunt. Proin imperdiet tempor lectus ac faucibus. '},
    {taskid: '12', task: 'Task 12', project: 'COMP 4230', duration: '400',breaks: 100, progress: 100, date: '2021-11-23', note:'Sed faucibus neque eget condimentum finibus. Proin rutrum, velit vitae laoreet ultrices, orci velit dictum arcu, non iaculis mi magna sed mi. Donec quis quam id turpis pulvinar dignissim laoreet eget erat. Sed porta quam urna, at faucibus sem mattis in. Fusce commodo nisi at velit porttitor, in vehicula purus feugiat.'}
]);

function fmt (seconds) {
    const format = val => `0${Math.floor(val)}`.slice(-2)
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const odd_secs = seconds % 60
    if (hours <= 0){ hh = ''} else {hh = hours+'h '}
    if (minutes <= 0){ mm = ''} else {mm = minutes+'m '}
    ss = odd_secs + 's'
    return hh+mm+ss
}

const array_column = (array, column) => {
    const result = [];
    array.forEach(e => {
        result.push(e[column]);
    });
    return result;
};

const array_range = (array, attr) => {
const result = [];
var min = Math.min.apply(null, array.map(item => item[attr])),
    max = Math.max.apply(null, array.map(item => item[attr]));
result.push(min);
result.push(max);
return result;
};

function asClassName(c){
    return c.replace(" ","-")
}

function asProjectName(c){
    return c.replace("-"," ")
}

function rolledup(data){
    var data_rollup = d3.flatRollup(data,v => d3.sum(v, d => d.duration), d => d.project)
    return data_rollup.slice().sort((a, b) => d3.descending(a[1], b[1]))
}

var color = d3.scaleOrdinal().domain(array_column(rolledup(data),0)).range(d3.schemeSet1);

function addCssRule(rule, css) {
    css = JSON.stringify(css).replace(/"/g, "").replace(/,/g, ";");
    $("<style>").prop("type", "text/css").html(rule + css).appendTo("head");
}


function load_all_items(){
    all_projects = array_column(rolledup(data),0);
    var html_j = '';
    for(i in all_projects){
        project = all_projects[i];
        var html_i = '';
        for (j in data){
            d=data[j]
            if (d.project == project){
                span = `<tr class="accordion-item-header taskHeader">
                            <td class="td-task">${d.task}</td>
                            <td class="td-progress">${d.progress}</td>
                            <td class="date td-date">${d.date}</td>
                        </tr>`
                html_i += span;
            }
        }
        html_j += 
        `<div class="accordion-item">
            <div class="accordion-item-header active">${project}</div>
            <div class="accordion-item-body" id="table1Parent" style="max-height: 250px;">
                <div class="accordion-item-body-content">
                <table class="content-table" id="table1">
                    <tbody>
                        ${html_i}
                    </tbody>
                </table>
                </div>
            </div>
        </div>`
    }
    listcontainer = document.getElementById("header-inprogress")
    listcontainer.innerHTML = html_j;
    // console.log(html_j);
}

function load_completed_items(completed){
    all_projects = array_column(rolledup(data),0);
    var html_j = '';
    for(i in all_projects){
        project = all_projects[i];
        var html_i = '';
        for (j in data){
            d=data[j]
            if (d.project == project & ((d.progress < 100 & !completed) | (d.progress == 100 & completed))){
                span = `<tr class="accordion-item-header taskHeader" id="taskid-${d.taskid}" onclick="display_task('${d.taskid}')">
                            <td class="td-task">${d.task}</td>
                            <td class="td-progress">${d.progress}</td>
                            <td class="date td-date">${d.date}</td>
                        </tr>`
                html_i += span;
            }
        }
        if (html_i != ''){
            html_j += 
            `<div class="accordion-item">
                <div class="accordion-item-header active">${project}</div>
                <div class="accordion-item-body" id="table1Parent" style="max-height: 250px;">
                    <div class="accordion-item-body-content">
                    <table class="content-table" id="table1">
                        <tbody>
                            ${html_i}
                        </tbody>
                    </table>
                    </div>
                </div>
            </div>`
        }
    }
    list_id = completed ? "list-completed" : "list-inprogress"
    table = document.getElementById(list_id)
    table.innerHTML = html_j;
}

function clicked(){
    console.log('clicked');
}

function display_task(taskid){
    var html='';
    for (j in data){
        d=data[j]
        // console.log(taskid, d.taskid, d.taskid == taskid)
        if (d.taskid == taskid){
            date_str = (d.progress < 100) ? "Due Date" : "Date Completed"
            html = 
            `<tr><td>Task</td><td>${d.task}</td></tr>
            <tr><td>Project</td><td>${d.project}</td></tr>
            <tr><td>Focus Time</td><td>${fmt(d.duration)}</td></tr>
            <tr><td>Break Time</td><td>${fmt(d.breaks)}</td></tr>
            <tr><td>Progress</td><td>${d.progress}%</td></tr>
            <tr><td>${date_str}</td><td>${d.date}</td></tr>
            <tr><td>Notes:</td><td></td></tr>`
            note = d.note;
            break;
        }
    }
    table = document.getElementById("table-details-body");
    table.innerHTML = html;
    notes = document.getElementById("text-notes");
    notes.innerHTML = note;

}

const searchInput = document.getElementById('searchID');

searchInput.addEventListener('keyup', function(event) {
    let rows = document.querySelectorAll(".content-table > tbody > tr");

    const q = event.target.value.toLowerCase();
    rows.forEach((row) => {
        row.querySelector("td").textContent.toLowerCase().includes(q)
        ? (row.style.display = "flex")
        : (row.style.display = "none");
    });
})

load_completed_items(false)
load_completed_items(true)