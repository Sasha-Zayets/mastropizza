//React
import React, { Component } from 'react';
//React native
import { Dimensions, View, Text, Animated } from 'react-native';
//Carousel
import SideSwipe from 'react-native-sideswipe';
//Components
import RestaurantBannerCard from './RestaurantBannerCard';
import VerticalSpacer, { Spacer } from "../shared";
//Styles
import styles from '../../styles/components/restaurant/carousel';
import { app_styles } from '../../styles/app_styles';



export default class CarouselRestaurant extends Component {
  

    state = {
        currentIndex: 0,        
        scales: this.props.scales,
        data: this.props.data
    };

    _populateDots = () => {
        let dots = this.state.data.map((item, index) => {
            return (
                <View key={index}>
                    <View
                        style={[
                            styles(this.state.scales).dot,
                            {
                                backgroundColor: index === this.state.currentIndex
                                    ? app_styles(this.state.scales).colors.text.light_grey
                                    : app_styles(this.state.scales).colors.app.white
                            }
                        ]}>
                    </View>
                </View>
            );
        })

        return dots;
    }

    render = () => {
        // center items on screen
        const { scales, currentIndex, data } = this.state;
        const { width } = Dimensions.get('window');
        const cardWidth = width;


        return (
            <View>
                <SideSwipe
                    index={currentIndex}
                    itemWidth={cardWidth}
                    style={{ width }}
                    data={data}
                    threshold={90}
                    ItemSeparatorComponent={() => <VerticalSpacer spaceWidth={50} />}
                    onIndexChange={index =>
                        this.setState(() => ({ currentIndex: index }))
                    }
                    renderItem={({ itemIndex, currentIndex, item, animatedValue }) => (
                        <RestaurantBannerCard
                            banner={item}
                            index={itemIndex}
                            currentIndex={currentIndex}
                            animatedValue={animatedValue}
                            cardWidth={cardWidth}
                        />
                    )}
                    useVelocityForIndex={true}
                />
                <View style={styles(scales).pagination}>
                    {
                        this._populateDots()
                    }
                </View>

            </View>


        );
    };
}