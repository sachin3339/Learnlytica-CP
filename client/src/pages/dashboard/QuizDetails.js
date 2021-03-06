
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup, Breadcrumb } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget, SalesValueWidget2 } from "../../components/Widgets";
import { Leaderboard, PageVisitsTable } from "../../components/Tables";
import { trafficShares } from "../../data/charts";
import { Routes } from "../../routes";
import GenericPdfDownloader from "../../components/GenericPdfDownloader";
import { Link } from 'react-router-dom';
import DevelopmentUrl from "../../constant";
import axios from 'axios';

export default (props) => {
  const [totalOrders, settotalOrders] = useState()
  const [totalUsers, setTotalUsers] = useState()
  const [avgScore, setAvgScore] = useState()
  const [avgTCE, setAvgTCE] = useState()
  const token = localStorage.getItem("token");
  useEffect(() => {
    axios.get(DevelopmentUrl + '/dashboard/languageandtotalcount', {
      headers: {
        "Content-Type": "text/plain",
        "Authorization": `bearer ${token}`
      }
    }
    )
      .then(res => {
        console.log(res.data.languageProficiency)
        settotalOrders(res.data.languageProficiency);
      })
      .catch(err => console.error(err))

      axios.get(DevelopmentUrl + `/dashboard/quizdetails/${props.match.params.quizid}`, {
        headers: {
          "Content-Type": "text/plain",
          "Authorization": `bearer ${token}`
        }
      }
      )
        .then(res => {
          console.log(res.data)
          // settotalOrders(res.data.languageProficiency);
          setTotalUsers(res.data["Total Quiz Participant"])
          setAvgScore(res.data["Average Assessment Score"])
          setAvgTCE(res.data["Quiz Test Case Efficiency"])
        })
        .catch(err => console.error(err))

  }, [])
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
      <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={Routes.AdminQuizDetailedReports.path}>Assessments</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{props.match.params.quizname}</Breadcrumb.Item>
          </Breadcrumb>
        <ButtonGroup>
          <GenericPdfDownloader rootElementId="pragya" downloadFileName="quiz-report"/>
        </ButtonGroup>
      </div>
      <div id="pragya">
      <Row className="justify-content-md-center">
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget2
            title="Total Problem Solved"
            value="130"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Number of Participants"
            title={totalUsers}
            period="3 hours"
            // percentage={18.2}
            percentageDisabled={true}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Average Assessment Score"
            title={avgScore}
            period="Feb 1 - Apr 1"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
        <CounterWidget
            category="Test Case Efficiency"
            title={avgTCE}
            period="3 hours"
            // percentage={18.2}
            percentageDisabled={true}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
      </Row>

      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  {/* <PageVisitsTable /> */}
                  <Leaderboard quizid={props.match.params.quizid} />
                </Col>

                {/* <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col> */}
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Submissions in different languages"
                    // value={40}
                    // percentage={18.2}
                    data={totalOrders}
                    type="quiz" />
                </Col>

                {/* <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col> */}
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
    </>
  );
};
