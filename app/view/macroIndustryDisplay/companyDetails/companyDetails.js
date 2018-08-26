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

        /**
         * ------------------------------
         * ------------------------------
         * http请求
         */
        function getCompanyDetail() {
            $http({
                url: 'http://localhost:8080/generalInfo/companyDetail',
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
        
        function getSimilarRecommendation() {
            $http({
                url: 'http://localhost:8080/similarRecommandation/',
                method: 'post',
                // contentType: "application/json",
                params: {
                    stkid: stkcd_toShow
                }
            }).then(function successCallBack(response) {
                console.log(response.data,2);
                let similarData = response.data;
                canvas = document.getElementById("canvas");
                context = canvas.getContext("2d");
                canvas.onmousemove = mousemove;

                //添加公司节点
                addCompany(similarData.company.compname,similarData.company.stkcd);

                let company_json_list = [];
                for(let i = 0; i<similarData.categories.length;i++){
                    let category_temp = similarData.categories[i];
                    for(let j = 0; j<similarData[category_temp].length;j++){
                        let company = similarData[category_temp][j];
                        let company_json_str = JSON.stringify(company);
                        if($.inArray(company_json_str,company_json_list) == -1  ){
                            company_json_list.push(company_json_str);
                        }
                    }
                }
                for(let i = 0 ; i<company_json_list.length;i++){
                    company_json_list[i] = JSON.parse(company_json_list[i]);
                    addCompany(company_json_list[i].compname,company_json_list[i].stkcd);
                }
                // console.log(22,company_json_list)

                //添加行业节点
                for(let i = 0; i<similarData.categories.length;i++){
                    addIndustry(similarData.categories[i]);
                }

                //添加关系链接
                for(let i = 0 ; i<industryList.length;i++){
                    addConnection(industryList[i],companyList[0]);
                    let indistry_index = industryList[i].name;
                    for (let j = 0 ; j<similarData[indistry_index].length;j++){
                        for(let n = 0 ; n <companyList.length;n++){
                            // console.log(companyList[n].name,1,similarData[indistry_index][j].compname)
                            if(companyList[n].name == similarData[indistry_index][j].compname){
                                // console.log(industryList[i],1,companyList[n]);

                                addConnection(industryList[i],companyList[n]);
                                // console.log(connectionList);
                                break;
                            }
                        }
                    }

                }
                console.log(companyList)
                console.log(industryList);
                console.log(connectionList);
                relocate();
                refreshAll();

            },function errorCallBack(response) {
                console.log(response);
            });

        }
        getSimilarRecommendation();


        // 用来储存每个公司对象
        function CompanyNode(x, y, radius, color,name,id) {

            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.isSelected = false;
            this.name = name;
            this.id = id;

        }

        function Industry(x,y,color,name) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.isSelected = false;
            this.name = name;
        }

        // 用来存储连接对象
        function Connection(industry,company) {
            this.industry = industry;
            this.company = company;
            this.isSelected = false;
        }



        let canvas;
        let context;

        let rect_width = 100;
        let rect_height = 50;

        let canvas_height = 600;
        let canvas_width = 600;
        let line_length = canvas_height/6;

        function drawRoundRect(industryNode){
            let x = industryNode.x-rect_width/2;
            let y = industryNode.y-rect_height/2;
            let radius = 10;
            context.beginPath();
            context.moveTo(x, y+radius);
            context.lineTo(x, y+rect_height-radius);
            context.quadraticCurveTo(x, y+rect_height, x+radius, y+rect_height);
            context.lineTo(x+rect_width-radius, y+rect_height);
            context.quadraticCurveTo(x+rect_width, y+rect_height, x+rect_width, y+rect_height-radius);
            context.lineTo(x+rect_width, y+radius);
            context.quadraticCurveTo(x+rect_width, y, x+rect_width-radius, y);
            context.lineTo(x+radius, y);
            context.quadraticCurveTo(x, y, x, y+radius);
            context.closePath();
            context.strokeStyle = "black";
            if (industryNode.isSelected) {
                context.lineWidth = 5;
            }
            else {
                context.lineWidth = 1;
            }
            context.stroke();
            context.fillStyle = "blue";
            context.fill();
        }
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

        function addCompany(name,id) {
            let radius = 30;
            let x = randomFromTo(0, canvas.width);
            let y = randomFromTo(0, canvas.height);

            // 随机颜色
            let colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
            let color = colors[randomFromTo(0, 8)];

            // 创建一个新结点
            let companyNode = new CompanyNode(x, y, radius, color,name,id);

            // 把它保存在数组中
            companyList.push(companyNode);
        }

        function addIndustry(name) {
            let x = randomFromTo(0, canvas.width);
            let y = randomFromTo(0, canvas.height);

            // 随机颜色
            let colors = ["green", "blue", "red", "yellow", "magenta", "orange", "brown", "purple", "pink"];
            let color = colors[randomFromTo(0, 8)];

            let industryNode = new Industry(x,y,color,name);
            industryList.push(industryNode);

        }

        function addConnection(industry,company) {
            let connection = new Connection(industry,company);
            // console.log(industry,"ad",company);
            connectionList.push(connection);
        }

        //在某个范围内生成随机数
        function randomFromTo(from, to) {
            return Math.floor(Math.random() * (to - from + 1) + from);
        }


        function refreshAll() {
            // 清除画布，准备绘制
            context.clearRect(0, 0, canvas.width, canvas.height);

            for(let i = 0;i<connectionList.length;i++){
                let connection = connectionList[i];
                context.moveTo(connection.industry.x,connection.industry.y);
                context.lineTo(connection.company.x,connection.company.y)
                context.lineWidth = 2;
                context.strokeStyle ="black" ;
                context.stroke();
            }

            // 遍历所有节点
            for(let i=0; i<companyList.length; i++) {
                let companyNode = companyList[i];

                // 绘制圆圈
                //         context.globalAlpha = 0.85;
                context.beginPath(

                );
                context.arc(companyNode.x, companyNode.y, companyNode.radius, 0, Math.PI*2);
                context.fillStyle = companyNode.color;
                context.strokeStyle = "black";

                if (companyNode.isSelected) {
                    context.lineWidth = 5;
                }
                else {
                    context.lineWidth = 1;
                }
                context.fill();
                context.stroke();
            }

            for(let i=0; i<industryList.length; i++) {
                let industryNode = industryList[i];
                drawRoundRect(industryNode);
            }


        }

        let previousNode;    //正在处理的上一个结点

        function mousemove(e) {

            let stop_node_type = "";

            if (previousNode != null) {
                previousNode.isSelected = false;
                previousNode = null;
            }

            // 取得画布上被单击的点
            var clickX = e.pageX - canvas.offsetLeft;
            var clickY = e.pageY - canvas.offsetTop;

            // 查找被单击的圆圈
            for (var i = companyList.length - 1; i >= 0; i--) {
                var circle = companyList[i];
                //使用勾股定理计算这个点与圆心之间的距离
                var distanceFromCenter = Math.sqrt(Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2))
                // 判断这个点是否在圆圈中
                if (distanceFromCenter <= circle.radius) {
                    previousNode = circle;

                    //选择新圆圈
                    circle.isSelected = true;

                    stop_node_type = "company";

                    //停止搜索
                    break;
                }
            }
            // 查找被单击的圆圈
            for (var i = industryList.length - 1; i >= 0; i--) {
                let industry_rect = industryList[i];
                let x_left = industry_rect.x - rect_width / 2;
                let x_right = industry_rect.x + rect_width / 2;
                let y_up = industry_rect.y - rect_height / 2;
                let y_down = industry_rect.y + rect_height / 2;
                // 判断这个点是否在圆圈中
                if (clickX >= x_left &&
                    clickX <= x_right &&
                    clickY >= y_up &&
                    clickY <= y_down) {

                    previousNode = industry_rect;

                    //选择新圆圈
                    industry_rect.isSelected = true;

                    stop_node_type = "industry";

                    //停止搜索
                    break;
                }
            }

            //更新显示，重绘圆圈
            refreshAll();
            //如果当前鼠标位置有圆圈，还要显示tip
            if (previousNode != null) {
                if(stop_node_type == 'company'){
                    drawToolTip(previousNode.name+ "\n"+"id:"+previousNode.id, clickX-50, clickY);
                }else {
                    drawToolTip("行业：" + previousNode.name, clickX, clickY);
                }

            }

        }




        function drawToolTip(txtLoc, x, y) {
            context.save();
            var padding = 3;
            var font = "16px arial";
            context.font = font;
            context.textBaseline = 'bottom';
            context.fillStyle = 'white';

            //绘制ToolTip背景
            var width = context.measureText(txtLoc).width;
            var height = parseInt(font, 10);
            context.fillRect(x, y-height, width+padding*2, height+padding*2);

            //绘制ToolTip文字
            context.fillStyle = '#000';
            context.fillText(txtLoc, x+padding, y+padding);

            context.restore();
        }


        function relocate() {
            let center_x = canvas_width/2;
            let center_y = canvas_height/2;

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




    })
