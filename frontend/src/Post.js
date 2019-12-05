import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import moment from 'moment';
import { IconContext } from "react-icons";
import API from './API';
import {
    GiSwapBag as ContainerIcon,
    GiScrollUnfurled as ConsumableIcon,
    GiBigGear as GizmoIcon,
    GiSharpAxe as WeaponIcon,
    GiTrophy as TrophyIcon,
    GiChestArmor as ArmorIcon,
    GiBlackCat as MiniPetIcon,
    GiDiamondRing as TrinketIcon,
    GiArmorUpgrade as UpgradeComponentIcon,
    GiTreasureMap as GatheringIcon,
    GiHammerNails as ToolIcon,
    GiStoneBlock as CraftingMaterialIcon,
    GiKnapsack as BagIcon,
    GiCape as BackIcon,
    GiKey as KeyIcon,
    GiTwoCoins as GoldIcon
} from 'react-icons/gi';

/*
Item Types:
    Container -- GiSwapBag
    Consumable -- GiPotionBall/GiStandingPotion/GiScrollUnfurled/GiTiedScroll
    Gizmo -- GiBigGear
    Weapon -- GiSharpAxe
    Trophy -- GiTrophy
    Armor -- GiChestArmor/GiLamellar
    MiniPet -- GiBlackCat
    Trinket -- GiDiamondRing
    UpgradeComponent -- GiArmorUpgrade
    Gathering -- GiHand?
    Tool -- GiHammerNails
    CraftingMaterial -- GiStoneBlock
    Bag -- GiKnapsack
    Back -- GiCape
    Key -- GiKey
*/

const ItemTypeIcons = {
    Container: ContainerIcon,
    Consumable: ConsumableIcon,
    Gizmo: GizmoIcon,
    Weapon: WeaponIcon,
    Trophy: TrophyIcon,
    Armor: ArmorIcon,
    MiniPet: MiniPetIcon,
    Trinket: TrinketIcon,
    UpgradeComponent: UpgradeComponentIcon,
    Gathering: GatheringIcon,
    Tool: ToolIcon,
    CraftingMaterial: CraftingMaterialIcon,
    Bag: BagIcon,
    Back: BackIcon,
    Key: KeyIcon
}

const styles = {
    paper: {
        width: '100%',
        textAlign: 'left',
        padding: 10,
        marginBottom: 10
    },
    button: {
        margin: 5
    }
};

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            icon: ItemTypeIcons[props.item.itemType]
        };
        this.deletePost = this.deletePost.bind(this);
    }

    async deletePost() {
        await API.delete(`posts/${this.props._id}`);
        this.props.reloadPosts();
    }

    render() {
        return (
            <Paper className={this.props.classes.paper}>
                <div className='post-header'>
                    <div className='post-item-name'>{this.props.item.itemName}</div>
                    <div className='post-buy-or-sell'>{this.props.isSelling ? 'Selling' : 'Buying'}</div>
                </div>
                <div className='post-subtitle'>
                    <IconContext.Provider value={{ className: 'post-item-icon' }}>
                        <div>
                            <this.state.icon />
                        </div>
                    </IconContext.Provider>
                    {this.props.item.itemType}
                </div>
                <div className='post-subtitle'>
                    <IconContext.Provider value={{ className: 'post-item-icon' }}>
                        <div>
                            <GoldIcon />
                        </div>
                    </IconContext.Provider>
                    {this.props.goldCost} gold
                </div>
                <p className='post-description'>{this.props.postText}</p>
                <div className='post-footer'>
                    <div className='post-gamertag'>
                        {this.props.user.gamertag}
                        {this.props.currentUserId === this.props.user._id?
                            <div className='post-delete' onClick={this.deletePost}>Delete</div>
                            :
                            ''
                        }
                    </div>
                    <div className='post-date'>{moment(this.props.time).fromNow()}</div>
                </div>
            </Paper>           
        );
    }
}

export default withStyles(styles)(Post);
