import React, { Component, Fragment } from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import {Agenda, LocaleConfig} from 'react-native-calendars';
import moment from 'moment'
import { parse } from 'node-html-parser';
import uuid from 'uuid/v1'
import 'moment/locale/fr'  // without this line it didn't work
moment.locale('fr')

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
    monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
    dayNamesShort: ['Dim.','Lun.','Mar.','Mer.','Jeu.','Ven.','Sam.']
};

LocaleConfig.defaultLocale = 'fr';

export default class AgendaScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {}
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems.bind(this)}
                onDayChange={this.loadItems.bind(this)}
                selected={moment().format('YYYY-MM-DD')}
                renderItem={this.renderItem.bind(this)}
                renderEmptyDate={this.renderEmptyDate.bind(this)}
                rowHasChanged={this.rowHasChanged.bind(this)}
                renderDay={this.renderDays.bind(this)}
                firstDay={1}
            />
        );
    }

    loadItems({dateString}) {

        let username = "matteo.peronnet"
        for(let i = 0; i < 7; i++) {
            let formatedDateApi = moment(dateString, 'YYYY-MM-DD').add(i, 'days').format('MM-DD-YYYY');
            let originalDate = moment(formatedDateApi, 'MM-DD-YYYY').format('YYYY-MM-DD');
            if(this.state.items[originalDate]) { continue }
            fetch(`http://edtmobilite.wigorservices.net:80/WebPsDyn.aspx?Action=posETUD&serverid=h&tel=${username}&date=${formatedDateApi}%208:00`,{
                method: 'GET',
                headers: {
                    'Accept': 'text/html; charset=utf-8',
                },
            }).then((res) => {
                let courses = [];
                console.log(res)
                parse(res._bodyText).querySelectorAll('.Ligne').map((element) => {
                    let course = {};
                    element.childNodes.map((node, index) => {
                        switch (index) {
                            case 0:
                                course.start = node.innerHTML;
                                break;
                            case 1:
                                course.end = node.innerHTML;
                                break;
                            case 2:
                                course.subject = node.innerHTML;
                                break;
                            case 3:
                                course.room = node.innerHTML;
                                break;
                            case 4:
                                course.teacher = node.innerHTML;
                                break;
                            default:
                                throw "Unable to parse data";
                        }
                    })
                    course.id = uuid();
                    courses.push(course);
                })

                this.setState({
                    ...this.state,
                    items: {
                        ...this.state.items,
                        [originalDate]: courses
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }

    renderItem(item) {
        return (
            <View style={[styles.item]}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text>
                        {item.start}
                    </Text>
                    <Text>
                        -
                    </Text>
                    <Text>
                        {item.end}
                    </Text>
                    <Text style={{marginLeft: 'auto'}}>
                        {item.room}
                    </Text>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={{fontWeight: "bold"}}>{item.subject}</Text>
                    <Text>{item.teacher}</Text>
                </View>
            </View>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}><Text>Pas cours 🍺 !</Text></View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.id !== r2.id;
    }

    renderDays(day, item) {
        return (
            <View style={{display: "flex", alignItems: 'center', padding: 10}}>
                {
                    day ? (
                            <View style={{width: 60}}>
                                <Text style={{fontSize: 35}}>
                                    {
                                        moment(day.dateString, 'YYYY-MM-DD').format('DD')
                                    }
                                </Text>
                                <Text style={{fontSize: 22}}>
                                    {
                                        moment(day.dateString, 'YYYY-MM-DD').format('MMM')
                                    }
                                </Text>
                            </View>
                        )
                        :
                        (
                            <View style={{width: 60}}>

                            </View>
                        )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 27
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    }
});
