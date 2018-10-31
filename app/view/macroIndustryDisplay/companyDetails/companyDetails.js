angular.module('myApp.macroIndustryDisplay.companyDetails', [

])

    .config(function($stateProvider, $urlRouterProvider){

    })

    .controller('CompanyDetailsCtrl',function($scope, $route, $http, $state,$stateParams) {
        var stkcd_toShow = $stateParams.stkcd_toShow;
        console.log(stkcd_toShow)
        $scope.companyDetails = {
            stkcd: 'xxx',
            compName: 'xxx',
            compNameEng: 'xxx',
            nature: 'xxx',
            foundDate: 'xxx',
            regCapital: 'xxx',
            chairman: 'xxx',
            fiscalDate: 'xxx',
            business: 'xxx',
            briefing: 'xxx',
            majorProductType: 'xxx',
            majorProductName: 'xxx',
            employee: 'xxx',
            administrativeDivision: 'xxx',
            province: 'xxx',
            city: 'xxx',
            address: 'xxx',
            office: 'xxx',
            zipCode: 'xxx',
            phone: 'xxx',
            fax: 'xxx',
            email: 'xxx',
            website: 'xxx',
            disclose: 'xxx',
            registerNumber: 'xxx',
            organizationCode: 'xxx',
            reportCur: 'xxx',
            listingOrNot: 'xxx',
            mainProduct: 'xxx',
            compPrename: 'xxx',
            boardChairmen: 'xxx',
            CEO: 'xxx',
            discloser: 'xxx',
            sar: 'xxx',
            crtinDPDirector: 'xxx',
            frminDPDirector: 'xxx'
        }

        /**
         * 返回上一页（即行业信息界面）
         */
        $scope.goBack = function (){
            history.back()
        }

        //显示行业分析简介
        $('.chart_container .aboutChart').mouseenter(function (e) {
            $('.chart_container .briefOfChart').show();
        })
        $('.chart_container .aboutChart').mouseleave(function (e) {
            $('.chart_container .briefOfChart').hide();
        })
        $('.chart_container .briefOfChart').mouseenter(function (e) {
            $('.chart_container .briefOfChart').show();
        })
        $('.chart_container .briefOfChart').mouseleave(function (e) {
            $('.chart_container .briefOfChart').hide();
        })

        /**
         * ------------------------------
         * ------------------------------
         * http请求
         */
        function getCompanyDetail() {
            $http({
                url: urlHead+'generalInfo/companyDetail',
                method: 'post',
                // contentType: "application/json",
                params: {
                    stkid: stkcd_toShow
                }
            }).then(function successCallBack(response) {
                console.log(response.data)
                var data = response.data;
                $scope.companyDetails = {
                    stkcd: data.stkcd,
                    compName: data.compname,
                    compNameEng: data.compnameeng,
                    nature: data.nature,
                    foundDate: data.founddate,
                    regCapital: data.regcapital,
                    chairman: data.chairman,
                    fiscalDate: data.fiscaldate,
                    business: data.business,
                    briefing: data.briefing,
                    majorProductType: data.majorproducttype,
                    majorProductName: data.majorproductname,
                    employee: data.employee,
                    administrativeDivision: data.administrativedivision,
                    province: data.province,
                    city: data.city,
                    address: data.address,
                    office: data.office,
                    zipCode: data.zipcode,
                    phone: data.phone,
                    fax: data.fax,
                    email: data.email,
                    website: data.website,
                    disclose: data.disclose,
                    registerNumber: data.registernumber,
                    organizationCode: data.orgnizationcode,
                    reportCur: data.reportcur,
                    listingOrNot: data.listingornot,
                    mainProduct: data.mainproduct,
                    compPrename: data.compprename,
                    boardChairmen: data.boardchairmen,
                    CEO: data.ceo,
                    discloser: data.discloser,
                    sar: data.sar,
                    crtinDPDirector: data.crtindpdirector,
                    frminDPDirector: data.frmindpdirector
                }
            },function errorCallBack(response) {
                console.log(response);
            });
        }

        /**
         * ------------------------------
         * ------------------------------
         * 方法调用
         */
        getCompanyDetail();



        // 保存画布上所有的圆圈
        let companyList = [];

        let industryList = [];

        // 保存已划好的线
        let connectionList = [];


        let nodeList = [];

        let linkList = [];

        let categoryList = ['根公司'];

        function getSimilarRecommendation() {
            $http({
                url: urlHead+'similarRecommandation/',
                method: 'post',
                // contentType: "application/json",
                params: {
                    stkid: stkcd_toShow
                }
            }).then(function successCallBack(response) {
                console.log(response.data,2);
                let similarData = response.data;

                //添加公司节点
                addCompany(similarData.company.compnamesummary,similarData.company.stkcd,0,0);


                //添加行业节点
                for(let i = 0; i<similarData.categories.length;i++){
                    addIndustry(similarData.categories[i],i+1);
                    categoryList.push(similarData.categories[i]);
                }

                let company_json_list = [];
                for(let i = 0; i<similarData.categories.length;i++){
                    let category_temp = similarData.categories[i];
                    for(let j = 0; j<similarData[category_temp].length;j++){
                        let company = similarData[category_temp][j];
                        let company_json_str = JSON.stringify(company);
                        if($.inArray(company_json_str,company_json_list) == -1  ){
                            company_json_list.push(company_json_str);
                            let company_json_temp = JSON.parse(company_json_str);
                            addCompany(company_json_temp.compnamesummary,company_json_temp.stkcd,company_json_list.length+industryList.length,categoryList.indexOf(category_temp));
                        }
                    }
                }
                // for(let i = 0 ; i<company_json_list.length;i++){
                //     company_json_list[i] = JSON.parse(company_json_list[i]);
                //     addCompany(company_json_list[i].compname+"_"+company_json_list[i].stkcd,i+industryList.length+1);
                // }
                // console.log(22,company_json_list)

                //添加关系链接
                for(let i = 0 ; i<industryList.length;i++){
                    addConnection(industryList[i],companyList[0]);
                    let indistry_index = industryList[i].name;
                    for (let j = 0 ; j<similarData[indistry_index].length;j++){
                        for(let n = 0 ; n <companyList.length;n++){
                            // console.log(companyList[n].name,1,similarData[indistry_index][j].compname)
                            if(companyList[n].name == similarData[indistry_index][j].compnamesummary){
                                // console.log(industryList[i],1,companyList[n]);
                                console.log(111)
                                addConnection(industryList[i],companyList[n]);
                                // console.log(connectionList);
                                break;
                            }
                        }
                    }

                }
                console.log(companyList)
                console.log(industryList);
                console.log("ww",connectionList);
                relocate();
                transformNodes();
                console.log("sss",nodeList)
                transformLinks();
                console.log(linkList);

                let similarRecommendationData = {};
                similarRecommendationData.nodes = nodeList;
                similarRecommendationData.links = linkList;
                initSimilarRecommendation(similarRecommendationData);
                // console.log(JSON.stringify(similarRecommendationData))
            },function errorCallBack(response) {
                console.log(response);
            });

        }
        getSimilarRecommendation();


        // 用来储存每个公司对象
        function CompanyNode(name,stkcd,id,category_index) {
            this.x = 0;
            this.y = 0;
            this.name = name;
            this.stkcd = stkcd;
            this.id = id;
            this.category_index = category_index;
        }

        function Industry(name,id) {
            this.x = 0;
            this.y = 0;
            this.name = name;
            this.id = id;
        }

        // 用来存储连接对象
        function Connection(industry,company) {
            this.industry = industry;
            this.company = company;
        }
        
        function chart_node(id,message,symbolSize,x,y,category_index) {
            var node = {
                "id": ""+id,
                "name": message,
                "itemStyle": null,
                "symbolSize": symbolSize,
                "x": x - chart_width/2,         //  jian
                "y": y - chart_height/2,         //  jian
                "attributes": {
                    "modularity_class": category_index
                },
                "value": 0,
                "label": {
                    "normal": {
                        "show": true
                    }
                },
                "category": category_index
            }
            return node;
        }

        function chart_link(id,source_index,target_index) {
            var link = {
                "id": ""+id,
                "name": null,
                "source": ""+source_index,
                "target": ""+target_index,
                "lineStyle": {
                    "normal": {}
                }
            }
            return link;
        }

        let chart_height = 600;
        let chart_width = 600;
        let line_length = chart_height/6;

        /*

            function addNode() {
                // 结点添加随机位置
                let radius = 30;
                let x = randomFromTo(0, canvas.width);
                let y = randomFromTo(0, canvas.height);
         
                // 随机颜色
                let colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
                let color = colors[randomFromTo(0, 8)];
         
                // 创建一个新结点
                let companyNode = new CompanyNode(x, y, radius, color);
         
                // 把它保存在数组中
                companyList.push(companyNode);
         
                // 重新绘制画布
                refreshAll();
            }
        */

        function addCompany(name,stkcd,id,category_index) {
            // 创建一个新结点
            let companyNode = new CompanyNode(name,stkcd,id,category_index);
            // 把它保存在数组中
            companyList.push(companyNode);
        }

        function addIndustry(name,id) {
            let industryNode = new Industry(name,id);
            industryList.push(industryNode);
        }

        function addConnection(industry,company) {
            let connection = new Connection(industry,company);
            // console.log(industry,"ad",company);
            connectionList.push(connection);
        }

        function transformNodes() {
            let node_root = chart_node(companyList[0].id,companyList[0].name,150,companyList[0].x,companyList[0].y,companyList[0].category_index);
            // let node_root = chart_node(companyList[0].id,companyList[0].name+"_"+companyList[0].stkcd,150,companyList[0].x,companyList[0].y,companyList[0].category_index);
            nodeList.push(node_root);
            for(let i = 0;i<industryList.length;i++){
                let node_category = chart_node(industryList[i].id,industryList[i].name,100,industryList[i].x,industryList[i].y,categoryList.indexOf(industryList[i].name));
                nodeList.push(node_category);
            }
            for(let i = 0;i<companyList.length;i++){
               if(i!=0){
                    let node_leaf = chart_node(companyList[i].id,companyList[i].name,50,companyList[i].x,companyList[i].y,companyList[i].category_index);
                    // let node_leaf = chart_node(companyList[i].id,companyList[i].name+"_"+companyList[i].stkcd,50,companyList[i].x,companyList[i].y,companyList[i].category_index);
                    nodeList.push(node_leaf);
               }
            }
        }
        function transformLinks() {
            for(let i = 0;i<connectionList.length;i++){
                let link_temp = chart_link(i,connectionList[i].company.id,connectionList[i].industry.id);
                linkList.push(link_temp);
            }
        }


        function relocate() {
            let center_x = chart_width/2;
            let center_y = chart_height/2;

            //根目录公司重定位
            companyList[0].x = center_x;
            companyList[0].y = center_y;

            //行业结点重定位
            if (industryList.length != 0) {
                let ave_dus_angle = 2 * Math.PI / industryList.length;
                for (let i = 0; i < industryList.length; i++) {

                    let angle_distury = ave_dus_angle * i;

                    industryList[i].x = center_x + line_length * Math.cos(angle_distury);
                    industryList[i].y = center_y + line_length * Math.sin(angle_distury);


                    let relatedCompanyList = getRelatedCompanyList(industryList[i]);
                    console.log(relatedCompanyList,industryList[i]);

                    if(relatedCompanyList.length!=0){
                        let angle_relaCom_ave = Math.PI / (relatedCompanyList.length+1);
                        for (let j = 0 ; j<relatedCompanyList.length;j++){
                            let angle_relaCom = angle_relaCom_ave * (j+1);

                            relatedCompanyList[j].x = industryList[i].x + line_length * Math.cos(angle_distury + angle_relaCom - Math.PI/2 );
                            relatedCompanyList[j].y = industryList[i].y + line_length * Math.sin(angle_distury + angle_relaCom - Math.PI/2 );
                        }
                    }



                }


                //相关公司重定位


            }



        }

        function getRelatedCompanyList(industry) {
            let result = [];

            for(let i = 0;i<connectionList.length;i++){
                let connection_temp = connectionList[i];
                if(connection_temp.industry == industry&&
                    connection_temp.company != companyList[0]){
                    result.push(connection_temp.company);

                }
            }

            return result;
        }

        function initSimilarRecommendation(similarData) {
            var dom = document.getElementById("similarRecommendChart");
            var myChart = echarts.init(dom);
            var app = {};
            option = null;

            var graph = similarData;
            let categories = [];
            for (var i = 0; i < categoryList.length; i++) {
                categories[i] = {
                    name: categoryList[i]
                };
            }
            graph.nodes.forEach(function (node) {
                node.itemStyle = null;
                node.value = "";
                node.symbolSize /= 1.5;
                node.label = {
                    normal: {
                        show: node.symbolSize > 2
                    }
                };
                node.category = node.attributes.modularity_class;
            });
            option = {
                tooltip: {},
                legend: [{
                    // selectedMode: 'single',
                    data: categories.map(function (a) {
                        return a.name;
                    }),
                    textStyle: {
                        color: '#c3c3c3'
                    }
                }],
                animationDuration: 1500,
                animationEasingUpdate: 'quinticInOut',
                series : [
                    {
                        type: 'graph',
                        layout: 'none',
                        data: graph.nodes,
                        links: graph.links,
                        categories: categories,
                        roam: true,
                        focusNodeAdjacency: true,
                        itemStyle: {
                            normal: {
                                borderColor: '#c3c3c3',
                                borderWidth: 1,
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.3)'
                            }
                        },
                        label: {
                            position: 'right',
                            formatter: '{b}'
                        },
                        lineStyle: {
                            color: 'source',
                            curveness: 0.3
                        },
                        emphasis: {
                            lineStyle: {
                                width: 10
                            }
                        }
                    }
                ]
            };

            myChart.setOption(option);
            // console.log(JSON.stringify(graph));
            if (option && typeof option === "object") {
                myChart.setOption(option, true);
            }

            myChart.on('click', function (params) {
                // let stkcd = params.name.split("_")[1];
                // let stkcd = companyList.indexOf(params.name);
                let stkcd = null;
                for(var i = 0; i < companyList.length; i++){
                    var tempNode = companyList[i];
                    if(tempNode.name == params.name){
                        stkcd = tempNode.stkcd;
                    }
                }
                if(stkcd!=null){
                    $state.go('macroIndustryDisplay.companyDetails',{stkcd_toShow:stkcd});
                }
            })


        }




    })
