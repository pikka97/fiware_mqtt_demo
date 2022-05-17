var mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');



function generate_data(student_id){   
    generated_value = (Math.random()*10 + Math.random()*100 * Math.random()).toPrecision(2)
    //data = { "studentID": student_id, "timestamp": new Date().getTime(), "value": generated_value }
    data = 'i|' + student_id +'|t|' + new Date().getTime() + '|v|' + generated_value;
    return data;
}

function publish_data() {
    client.publish(topic, generate_data(student_id));
        //JSON.stringify(generate_data(student_id)));
};

interval_id = null;
const sending_delta_time = 1000 //A second in ms
const topic = '/ul/4jggokgpepnvsb2uv4s40d59ov/Lab001/attrs';//'IOT22';
const student_id = '4481533';

client.on('connect', () => {
    console.log('connected to the broker!')
    client.subscribe(topic);
    
    publish_data();
    interval_id = setInterval(() =>{ 
        publish_data();
    }, sending_delta_time)
});

client.on('message', (topic, message) => {
    console.log('published: ', message.toString());
})

client.on('close',() => {clearInterval(interval_id)});